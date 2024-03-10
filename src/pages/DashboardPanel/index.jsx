import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Row, Col } from 'antd';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import api from 'components/api/api';
import './DashboardPanel.css';
import { Select } from 'antd';
import { Checkbox } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';

const { Option } = Select;

const DashboardPanel = () => {
    const isMobile = window.innerWidth < 768;
    const chartSize = isMobile ? { width: 280, height: 250 } : { width: 530, height: 300 };

    const [timeFilter, setTimeFilter] = useState('Esta semana');
    const [dataForChart, setDataForChart] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual por padrão
    const [viewOtherMonths, setViewOtherMonths] = useState(false);
    const [convenioData, setConvenioData] = useState({ particular: 0, convenio: 0 });
    const [viewProfessionalsFilter, setViewProfessionalsFilter] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [professionalsList, setProfessionalsList] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { authData } = useAuth();
    const companyID = authData.companyID;
    
    const [appointmentData, setAppointmentData] = useState({
        confirmed: 0,
        cancelled: 0,
        toConfirm: 0,
    });

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 3 }, (_, i) => currentYear - i);
    }, []);
    
    const handleTimeFilterChange = useCallback((filter) => {
        setTimeFilter(filter);
        setViewOtherMonths(false);
    }, []);

    const handleMonthSelection = useCallback((value) => {
        setSelectedMonth(value);
        setTimeFilter('Todos');
    }, []);

    const parseDate = (dateStr) => {
        const parts = dateStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    const getStartDate = (filter) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (filter) {
            case 'Esta semana':
                const dayOfWeek = today.getDay();
                const startDateOfWeek = new Date(today);
                startDateOfWeek.setDate(today.getDate() - dayOfWeek);
                return startDateOfWeek;
            case 'Últimos 15 dias':
                return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15);
            case 'Último mês':
                return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
            default:
                return null;
        }
    };

    const months = useMemo(() => [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' }
    ], []);

    useEffect(() => {
        const fetchData = async () => {
 
            if (companyID && authData.authToken) {
                try {
                    const response = await api.get(`/agendamentos?company_id=${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error('Falha ao buscar dados da clínica');
                    }


                    let filteredAppointments = response.data;

                    // Filtrar por profissional selecionado, se aplicável
                    if (viewProfessionalsFilter && selectedProfessional) {
                        filteredAppointments = filteredAppointments.filter(appointment => appointment.professional_id === selectedProfessional);
                    }

                    // Filtrar por mês selecionado, se aplicável
                    if (viewOtherMonths) {
                        filteredAppointments = filteredAppointments.filter(appointment => {
                            const appointmentDate = parseDate(appointment.data);
                            return (appointmentDate.getMonth() + 1) === selectedMonth && appointmentDate.getFullYear() === selectedYear;
                        });
                    } else {
                        // Filtrar por tempo (semana, 15 dias, último mês), independente do mês
                        const startDate = getStartDate(timeFilter);
                        if (startDate) {
                            filteredAppointments = filteredAppointments.filter(appointment => {
                                const appointmentDate = parseDate(appointment.data);
                                return appointmentDate >= startDate;
                            });
                        }
                    }

                    const stats = {
                        confirmed: 0,
                        cancelled: 0,
                        toConfirm: 0,
                    };

                    const convenioStats = {
                        particular: 0,
                        convenio: 0,
                    };

                    filteredAppointments.forEach(appointment => {
                        if (appointment.status === 1) {
                            stats.confirmed += 1;
                        } else if (appointment.status === 2) {
                            stats.cancelled += 1;
                        } else {
                            stats.toConfirm += 1;
                        }

                        if (appointment.planodental && appointment.planodental.toLowerCase() === 'particular') {
                            convenioStats.particular += 1;
                        } else {
                            convenioStats.convenio += 1;
                        }
                    });

                    setAppointmentData(stats);
                    setConvenioData(convenioStats);
                } catch (error) {
                    console.error('Erro ao buscar dados dos agendamentos', error);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };


        fetchData();
    }, [timeFilter, selectedYear, selectedMonth, viewOtherMonths, viewProfessionalsFilter, selectedProfessional, companyID, authData.authToken]);

    useEffect(() => {
        const fetchProfessionals = async () => {

            if (companyID && authData.authToken) {
                try {
                    const response = await api.get(`/professionals?company_id=${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        },
                    });

                    const secretKey = process.env.REACT_APP_SECRET_KEY;
                    const bytes = CryptoJS.AES.decrypt(response.data, secretKey);
                    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
              
                    if (response.status === 200) {
                        setProfessionalsList(decryptedData);
                    }
                } catch (error) {
                    console.error('Erro ao buscar profissionais', error);
                }
            }
        };

        fetchProfessionals();
    }, [companyID, authData.authToken]);


    useEffect(() => {
        const updatedData = [
            { name: 'Confirmados', uv: appointmentData.confirmed, fill: '#00CED1' },
            { name: 'Cancelados', uv: appointmentData.cancelled, fill: '#FF4500' },
            { name: 'A Confirmar', uv: appointmentData.toConfirm, fill: '#FFD700	' },
        ];

        setDataForChart(updatedData);
    }, [appointmentData]);


    return (
        <div>
            <div className='dashboard'>
                <h1>Gestão e Acompanhamento <DashboardOutlined /></h1>
                <div className='dashboard-buttons'>
                    <Button
                        type={timeFilter === 'Esta semana' ? 'primary' : 'default'}
                        onClick={() => handleTimeFilterChange('Esta semana')}
                        className='dashboard-button'
                    >
                        Esta semana
                    </Button>
                    {' '}
                    <Button
                        type={timeFilter === 'Últimos 15 dias' ? 'primary' : 'default'}
                        onClick={() => handleTimeFilterChange('Últimos 15 dias')}
                        className='dashboard-button'
                    >
                        Últimos 15 dias
                    </Button>
                    <Button
                        type={timeFilter === 'Último mês' ? 'primary' : 'default'}
                        onClick={() => handleTimeFilterChange('Último mês')}
                        className='dashboard-button'
                    >
                        Últimos 30 dias
                    </Button>
                </div>
                <Checkbox
                    checked={viewOtherMonths}
                    onChange={e => setViewOtherMonths(e.target.checked)}
                >
                    Ver outros meses
                </Checkbox>
                {viewOtherMonths && (
                    <>
                        <Select
                            value={selectedYear}
                            style={{ width: 120 }}
                            onChange={value => setSelectedYear(value)}
                            className='dashboard-button'
                        >
                            {years.map(year => (
                                <Option key={year} value={year}>{year}</Option>
                            ))}
                        </Select>
                        <Select
                            value={selectedMonth}
                            style={{ width: 120 }}
                            onChange={handleMonthSelection}
                            className='dashboard-button'
                        >
                            {months.map(month => (
                                <Option key={month.value} value={month.value}>{month.label}</Option>
                            ))}
                        </Select>
                    </>
                )}

                <Checkbox
                    checked={viewProfessionalsFilter}
                    onChange={e => setViewProfessionalsFilter(e.target.checked)}
                >
                    Filtrar por Profissional
                </Checkbox>
                {viewProfessionalsFilter && (
                    <Select
                        value={selectedProfessional}
                        style={{ width: 200 }}
                        onChange={value => setSelectedProfessional(value)}
                    >
                        {professionalsList.map(professional => (
                            <Option key={professional.id} value={professional.id}>{professional.nome}</Option>
                        ))}
                    </Select>
                )}

            </div>

            <div className='dashboard-radials'>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Card title="Status dos atendimentos">
                            <div className="chartContainer" style={{ margin: isMobile ? '0 auto' : '0' }}>
                                <RadialBarChart
                                    width={chartSize.width}
                                    height={chartSize.height}
                                    innerRadius="20%"
                                    outerRadius="90%"
                                    data={dataForChart}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv' />
                                    <Legend
                                        iconSize={10}
                                        width={120}
                                        height={140}
                                        layout='vertical'
                                        verticalAlign='middle'
                                        wrapperStyle={{ top: 0, left: isMobile ? 0 : 20, lineHeight: '24px' }}
                                        className={isMobile ? "legend-mobile" : ""}
                                    />
                                </RadialBarChart>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card title="Particular x Convênio">
                            <div className="chartContainer" style={{ margin: isMobile ? '0 auto' : '0' }}>
                                <RadialBarChart
                                    width={chartSize.width}
                                    height={chartSize.height}
                                    innerRadius="20%"
                                    outerRadius="90%"
                                    data={[
                                        { name: 'Particular', uv: convenioData.particular, fill: '#32CD32	' },
                                        { name: 'Convênio', uv: convenioData.convenio, fill: '#7B68EE' }
                                    ]}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv' />
                                    <Legend
                                        iconSize={10}
                                        width={120}
                                        height={140}
                                        layout='vertical'
                                        verticalAlign='middle'
                                        wrapperStyle={{ top: 0, left: isMobile ? 0 : 20, lineHeight: '24px' }}
                                        className={isMobile ? "legend-mobile" : ""}
                                    />
                                </RadialBarChart>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardPanel;
