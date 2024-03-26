import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Divider, Modal, TimePicker, message } from 'antd';
import moment from 'moment';
import api from '../api/api';

const WeeklyModal = ({ isVisible, setIsVisible, selectedProfessional }) => {
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const orderedDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const [timeIntervals, setTimeIntervals] = useState({});
    const [interval, setInterval] = useState(null);
    const [enderecos, setEnderecos] = useState([]);
    const [selectedEnderecos, setSelectedEnderecos] = useState({});

    const handleIntervalChange = (value) => {
        setInterval(value ? value.format('HH:mm') : null);
    };

    const transformToTimeIntervals = (days) => {
        let intervals = {};
        days.forEach(day => {
            intervals[day.id] = {
                startam: day.startam,
                endam: day.endam,
                startpm: day.startpm,
                endpm: day.endpm
            };
        });
        return intervals;
    };
    const handleTimePickerFocus = (dayId, period) => {
        setTimeIntervals(prev => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                [period]: null
            }
        }));
    };

    const handleEnderecoSelection = (dayId, enderecoId) => {
        setSelectedEnderecos(prev => ({
            ...prev,
            [dayId]: enderecoId
        }));
    };

    useEffect(() => {
        const fetchDaysOfWeek = async () => {
            try {
                const response = await api.get('/dias-semanais');
                setDaysOfWeek(response.data);
                setTimeIntervals(transformToTimeIntervals(response.data));
            } catch (error) {
                console.error('Erro ao buscar dias da semana', error);
            }
        };
        fetchDaysOfWeek();
    }, []);



    const sortedDaysOfWeek = daysOfWeek.sort((a, b) => orderedDays.indexOf(a.dia) - orderedDays.indexOf(b.dia));

    const toggleDayActiveStatus = async (dayId, isActive) => {
        try {
            const response = await api.put(`/dias-semanais/${dayId}`, {
                ativo: isActive,
                professional_id: selectedProfessional,
            });

            if (response.data.professional_id === selectedProfessional) {
                setDaysOfWeek(prevDays =>
                    prevDays.map(day =>
                        day.id === dayId ? { ...day, ativo: isActive } : day
                    )
                );
            } else {
                throw new Error('Dia da semana não corresponde ao profissional selecionado.');
            }
        } catch (error) {
            console.error('Erro ao atualizar dia da semana', error);
            message.error('Erro ao atualizar dia da semana. Tente novamente.');
        }
    };


    useEffect(() => {
        if (selectedProfessional) {
            const fetchDaysOfWeek = async () => {
                try {
                    const response = await api.get(`/dias-semanais/?professional_id=${selectedProfessional}`);
                    setDaysOfWeek(response.data);
                    setTimeIntervals(transformToTimeIntervals(response.data));
                } catch (error) {
                    console.error('Erro ao buscar dias da semana', error);
                }
            };
            fetchDaysOfWeek();
        }
    }, [selectedProfessional]);

    useEffect(() => {
        const fetchDaysOfWeekAndAddresses = async () => {
            try {
                const response = await api.get(`/dias-semanais/?professional_id=${selectedProfessional}`);
                setDaysOfWeek(response.data);

                const addressSelections = response.data.reduce((acc, day) => {
                    if (day.endereco_id) {
                        acc[day.id] = day.endereco_id;
                    }
                    return acc;
                }, {});

                setSelectedEnderecos(addressSelections);
                setTimeIntervals(transformToTimeIntervals(response.data));
            } catch (error) {
                console.error('Erro ao buscar dias da semana', error);
            }
        };

        if (isVisible && selectedProfessional) {
            fetchDaysOfWeekAndAddresses();
        }
    }, [isVisible, selectedProfessional]);


    useEffect(() => {
        const fetchInterval = async () => {
            try {
                const response = await api.get(`/professional-intervals/professional/${selectedProfessional}`);
                if (response.data) {
                    setInterval(moment(response.data.intervalo, 'HH:mm'));
                } else {
                    setInterval(null);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    message.info('Nenhum intervalo configurado para este profissional.');
                    setInterval(null);
                } else {
                    console.error('Erro ao buscar intervalo de atendimento', error);
                    message.error('Erro ao buscar intervalo de atendimento. Tente novamente.');
                }
            }
        };

        if (isVisible && selectedProfessional) {
            fetchInterval();
        }
    }, [isVisible, selectedProfessional]);

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const response = await api.get(`/enderecos/professional/${selectedProfessional}`);
                const fetchedEnderecos = response.data || [];
                setEnderecos(fetchedEnderecos);

                // Se houver apenas um endereço, selecione-o automaticamente para todos os dias da semana
                if (fetchedEnderecos.length === 1) {
                    const uniqueEnderecoId = fetchedEnderecos[0].id;
                    const updatedSelectedEnderecos = daysOfWeek.reduce((acc, day) => {
                        acc[day.id] = uniqueEnderecoId;
                        return acc;
                    }, {});

                    setSelectedEnderecos(updatedSelectedEnderecos);
                }
            } catch (error) {
                console.error('Erro ao carregar endereços:', error);
                message.error('Erro ao carregar endereços.');
            }
        };

        if (selectedProfessional) {
            fetchEnderecos();
        }
    }, [selectedProfessional, daysOfWeek]); // Adicione daysOfWeek como dependência para garantir a atualização



    const handleSaveDaysStatus = async () => {
        const hasSelectedAddress = daysOfWeek.some(day => day.ativo && selectedEnderecos[day.id]);
        const areAddressesAvailable = enderecos.length > 0;
    
        if (areAddressesAvailable && !hasSelectedAddress) {
            message.error("Por favor, selecione pelo menos um endereço para os dias ativos.");
            return;
        }
    
        const updates = [];
        let hasError = false;
    
        for (const day of daysOfWeek) {
            const intervalsForDay = timeIntervals[day.id];
            if (day.ativo && (!intervalsForDay || !intervalsForDay.startam || !intervalsForDay.endam || !intervalsForDay.startpm || !intervalsForDay.endpm)) {
                hasError = true;
                message.error(`Por favor, defina todos os intervalos de tempo para ${day.dia}.`);
                break;
            }
    
            const payload = {
                ativo: day.ativo,
                endereco_id: selectedEnderecos[day.id],
                ...timeIntervals[day.id]
            };
    
            if (day.changed || timeIntervals[day.id]) {
                const update = api.put(`/dias-semanais/${day.id}`, payload);
                updates.push(update);
            }
        }
    
        if (hasError) return;
    
        if (!interval) {
            message.error("Por favor, selecione um intervalo de tempo entre atendimentos.");
            return;
        }
    
        const intervalPayload = {
            professional_id: selectedProfessional,
            intervalo: interval,
        };
    
        updates.push(api.post('/professional-intervals', intervalPayload));
    
        try {
            await Promise.all(updates);
            message.success("Configurações do padrão semanal e intervalo de atendimento atualizadas com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar configurações', error);
            message.error('Erro ao atualizar configurações. Tente novamente.');
        } finally {
            setIsVisible(false);
        }
    };
    



    const handleTimeIntervalChange = (dayId, period, value) => {
        setTimeIntervals(prev => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                [period]: value ? value.format('HH:mm') : null
            }
        }));
    };

    const replicateTimeIntervals = () => {
        const firstDayId = daysOfWeek.find(day => day.ativo).id;
        const firstDayIntervals = timeIntervals[firstDayId];

        const newTimeIntervals = { ...timeIntervals };
        daysOfWeek.forEach(day => {
            if (day.id !== firstDayId) {
                newTimeIntervals[day.id] = { ...firstDayIntervals };
            }
        });

        setTimeIntervals(newTimeIntervals);
    };


    return (
        <Modal
            title="Padrão Semanal de Atendimento"
            open={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={[
                <Button key="back" onClick={() => setIsVisible(false)}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSaveDaysStatus}>
                    Salvar
                </Button>
            ]}
            width={600}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto', padding: '0 10px 0 0' }} 
        >
            <p>Aqui você configura os dias da semana, locais e intervalos de tempo que sua agenda estará disponível para seus clientes:</p>
            <Button type='primary' onClick={replicateTimeIntervals} style={{ marginBottom: '10px', width: '100%' }}>Replicar Horários</Button>
            <div>
                {sortedDaysOfWeek.map(day => (
                    <div key={day.id} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Checkbox
                                type="checkbox"
                                checked={day.ativo}
                                onChange={() => toggleDayActiveStatus(day.id, !day.ativo)}
                            />
                            <span style={{ marginLeft: '10px' }}>{day.dia}</span>
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            {enderecos.map(endereco => (
                                <Checkbox
                                    key={endereco.id}
                                    checked={selectedEnderecos[day.id] === endereco.id}
                                    onChange={() => handleEnderecoSelection(day.id, endereco.id)}
                                >
                                    {`${endereco.rua}, ${endereco.numero} - ${endereco.cidade}/${endereco.uf}`}
                                </Checkbox>

                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TimePicker
                                disabled={!day.ativo}
                                format="HH:mm"
                                placeholder="Início AM"
                                onChange={value => handleTimeIntervalChange(day.id, 'startam', value)}
                                value={timeIntervals[day.id]?.startam ? moment(timeIntervals[day.id].startam, 'HH:mm') : null}
                                onFocus={() => handleTimePickerFocus(day.id, 'startam')}
                            />
                            <TimePicker
                                disabled={!day.ativo}
                                format="HH:mm"
                                placeholder="Fim AM"
                                onChange={value => handleTimeIntervalChange(day.id, 'endam', value)}
                                value={timeIntervals[day.id]?.endam ? moment(timeIntervals[day.id].endam, 'HH:mm') : null}
                                onFocus={() => handleTimePickerFocus(day.id, 'endam')}
                            />
                            <TimePicker
                                disabled={!day.ativo}
                                format="HH:mm"
                                placeholder="Início PM"
                                onChange={value => handleTimeIntervalChange(day.id, 'startpm', value)}
                                value={timeIntervals[day.id]?.startpm ? moment(timeIntervals[day.id].startpm, 'HH:mm') : null}
                                onFocus={() => handleTimePickerFocus(day.id, 'startpm')}
                            />
                            <TimePicker
                                disabled={!day.ativo}
                                format="HH:mm"
                                placeholder="Fim PM"
                                onChange={value => handleTimeIntervalChange(day.id, 'endpm', value)}
                                value={timeIntervals[day.id]?.endpm ? moment(timeIntervals[day.id].endpm, 'HH:mm') : null}
                                onFocus={() => handleTimePickerFocus(day.id, 'endpm')}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <label style={{ marginRight: '40px' }}>Intervalo de tempo entre um atendimento e outro:</label>
                <TimePicker
                    format="HH:mm"
                    placeholder="Selecione o intervalo"
                    onChange={handleIntervalChange}
                    onFocus={() => setInterval(null)}
                    value={interval ? moment(interval, 'HH:mm') : null}
                />
            </div>
            <Divider />
        </Modal>
    );
}

export default WeeklyModal;
