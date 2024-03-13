import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { StyledEncontreContainer, StyledInputsEncontre, StyledResultBeforeSearch, StyledResultsBeforeSearch } from './styles';
import api from 'components/api/api';
import { BASE_URL } from 'config';


const SearchProfessionals = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [professionals, setProfessionals] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [specialtySearchTerm, setSpecialtySearchTerm] = useState('');
    const [citySearchTerm, setCitySearchTerm] = useState('');

    const handleSearch = async () => {
        if (!specialtySearchTerm && !citySearchTerm) {
            notification.error({
                message: 'Por favor, insira uma especialidade ou cidade para a pesquisa.',
            });
            return;
        }

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
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="city">Cidade</label>
                    <Input
                        id="city"
                        placeholder="Cidade"
                        value={citySearchTerm}
                        onChange={e => setCitySearchTerm(e.target.value)}
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
            <div className="search-results">
                {professionals.length > 0 ? professionals.map((prof) => (
                    <div key={prof.id} style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                        {prof.foto && (
                            <img src={`${BASE_URL}/${prof.foto}`} alt="Perfil" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
                        )}
                        <div>
                            <h3>{prof.nome}</h3>
                            <p><strong>Especialidade:</strong> {prof.especialidade || 'Não informada'}</p>
                            <p><strong>Registro Profissional:</strong> {prof.registro_profissional || 'Não informado'}</p>
                            <p><strong>Atendimento:</strong> {prof.atendimento === '1' ? 'Apenas Presencial' : prof.atendimento === '2' ? 'Apenas Teleconsulta' : 'Ambos'}</p>
                            <p><strong>Endereço:</strong> {`${prof.endereco}, ${prof.numero}, ${prof.bairro || ''}, ${prof.cidade} - ${prof.uf}`}</p>
                            <p><strong>CEP:</strong> {prof.cep}</p>
                            <p><strong>Telefone:</strong> {prof.telefone || 'Não informado'}</p>
                            <p><strong>Email:</strong> {prof.email || 'Não informado'}</p>
                            <p><strong>Instagram:</strong> {prof.instagram ? `@${prof.instagram}` : 'Não informado'}</p>
                        </div>
                    </div>
                )) : <p>Nenhum profissional encontrado.</p>}
            </div>

        </StyledEncontreContainer>);
};

export default SearchProfessionals;
