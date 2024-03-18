import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { StyledDoctorsContainer, StyledEncontreContainer, StyledInputsEncontre } from './styles';
import api from 'components/api/api';
import { BASE_URL } from 'config';
import Loading from 'components/Loading';
import { LoadingOverlay } from 'pages/ContactPage/styles';
import { Link } from 'react-router-dom';
import { CompassOutlined } from '@ant-design/icons';


const SearchProfessionals = () => {
    const [professionals, setProfessionals] = useState([]);
    const [specialtySearchTerm, setSpecialtySearchTerm] = useState('');
    const [citySearchTerm, setCitySearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchAttempted, setSearchAttempted] = useState(false); // Novo estado para controlar se uma busca foi realizada

    const handleSearch = async () => {
        if (!specialtySearchTerm && !citySearchTerm) {
            notification.error({
                message: 'Por favor, insira uma especialidade ou cidade para a pesquisa.',
            });
            return;
        }
        setIsLoading(true);
        setSearchAttempted(true);

        try {
            const response = await api.get('/publicProfessionals/search', {
                params: {
                    especialidade: specialtySearchTerm,
                    cidade: citySearchTerm,
                },
            });
            setProfessionals(response.data);

        } catch (error) {
            console.error('Erro ao buscar profissionais', error);
            notification.error({
                message: 'Erro ao buscar profissionais',
            });
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSpecialtyFocus = () => {
        setCitySearchTerm('');
    };

    const handleCityFocus = () => {
        setSpecialtySearchTerm('');
    };



    return (
        <StyledEncontreContainer>
            <h2>Pesquise por profissionais na sua localidade ou por Especialidade.</h2>
            <StyledInputsEncontre>
                <div className="input-group">
                    <label htmlFor="speciality">Especialidade</label>
                    <Input
                        id="speciality"
                        placeholder="Ex. Fisioterapeuta"
                        value={specialtySearchTerm}
                        onChange={e => setSpecialtySearchTerm(e.target.value)}
                        onFocus={handleSpecialtyFocus}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="city">Cidade</label>
                    <Input
                        id="city"
                        placeholder="Cidade"
                        value={citySearchTerm}
                        onChange={e => setCitySearchTerm(e.target.value)}
                        onFocus={handleCityFocus}
                    />
                </div>
                <div className="search-button">
                    <Button
                        type="primary"
                        onClick={handleSearch}
                    >
                        Pesquisar
                    </Button>
                </div>
            </StyledInputsEncontre>
            {isLoading ? <LoadingOverlay><Loading /> </LoadingOverlay> : (
                <StyledDoctorsContainer>
                    {professionals.length > 0 ? (
                        professionals.map((prof) => (<div className='doctors-card' key={prof.id}>
                            {prof.foto && (
                                <img src={`${BASE_URL}/${prof.foto}`} alt="Perfil" />
                            )}
                            <div className='doctors-infos'>
                                <h3>{prof.nome}</h3>
                                <p> <strong> {prof.especialidade || 'Não informada'}</strong></p>
                                <p><CompassOutlined /> {`${prof.endereco}, ${prof.numero}, ${prof.bairro || ''}, ${prof.cidade} - ${prof.uf}`}</p>
                            </div>
                            <div className='doctors-mais'>
                                <Link to={`/publicProfessionals/${prof.id}`}>
                                    <Button type='primary'>
                                        Ver mais
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        ))
                    ) : (
                        searchAttempted && <p>Nenhum profissional encontrado.</p> // Exibe a mensagem apenas se uma busca foi realizada
                    )}
                </StyledDoctorsContainer>
            )}
        </StyledEncontreContainer >);
};

export default SearchProfessionals;
