import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'components/api/api';

const DeclationInfoPage = () => {
    const [atestadoInfo, setAtestadoInfo] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        api.get(`/logs_atestados/${id}`)
        .then(response => {
            setAtestadoInfo(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar informações do atestado:", error);
        });
    
    }, [id]);

    if (!atestadoInfo) {
        return <p>Carregando informações do atestado...</p>;
    }

    return (
        <div style={{margin: '50px'}}>
            <h1>Informações do Atestado</h1>
            <p>No sistema Marquei existe o registro de uma <b> {atestadoInfo.text}</b></p>
        </div>
    );
};

export default DeclationInfoPage;
