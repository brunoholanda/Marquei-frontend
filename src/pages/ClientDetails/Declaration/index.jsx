import React, { useEffect, useState } from 'react';
import '../Atestado/Atestado.css';
import { QRCode, message } from 'antd';
import api from 'components/api/api';
import { BASE_URL } from 'config';
import insta from '../../../public/icons/insta.png';
import wp from '../../../public/icons/wp-hover.png';
import { CompassOutlined } from '@ant-design/icons';


const DeclarationPage = React.forwardRef(({ nome, date, professionalId, startTime, endTime, qrCodeUrl }, ref) => {
    const [professionalDetails, setProfessionalDetails] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [qrKey, setQrKey] = useState(Date.now());

    useEffect(() => {
        if (qrCodeUrl) {
            setQrKey(Date.now());
        }
    }, [qrCodeUrl]);
    const getCurrentDateFormatted = () => {
        const today = new Date();
        const day = today.getDate();
        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const monthName = months[today.getMonth()];
        const year = today.getFullYear();
        return `${day} de ${monthName} de ${year}`;
    };

    useEffect(() => {
        if (professionalId) {
            const fetchDetails = async () => {
                try {
                    const response = await api.get(`/professionals/${professionalId}`);
                    setProfessionalDetails(response.data);

                    if (response.data.company_id) {
                        const companyResponse = await api.get(`/companies/${response.data.company_id}`);
                        setCompanyDetails(companyResponse.data);
                    }
                } catch (error) {
                    console.error("Erro ao buscar detalhes do profissional ou da empresa", error);
                    message.error("Erro ao buscar detalhes do profissional ou da empresa");
                }
            };
            fetchDetails();
        }
    }, [professionalId]);

    useEffect(() => {
        let isMounted = true;
        if (companyDetails && companyDetails.logo_path) {
            const img = new Image();
            img.src = companyDetails.logo_path;
            setLogoUrl(`${BASE_URL}/${companyDetails.logo_path}`);

            img.onload = () => {
                if (isMounted) {
                    console.log("Imagem carregada com sucesso.");
                    setCompanyDetails(prevDetails => ({ ...prevDetails }));
                }
            };

            img.onerror = (e) => {
                console.error("Erro ao carregar a imagem:", e);
            };
        }

        return () => {
            isMounted = false;
        };
    }, [companyDetails]);


    return (
        <div className="certificate-page" ref={ref}>
            {companyDetails && companyDetails.logo_path && (
                <div className="cabecalho">
                    <div className="company-logo">
                        <img src={logoUrl} alt="Logo da Empresa" />
                    </div>
                    <h3>{companyDetails.nome}</h3>
                </div>
            )}
            <div className="certificate-title">
                <h1>Declaração</h1>
            </div>
            <div className="certificate-body">
                <p className="indented-text">
                    Informo para os devidos fins que {nome} compareceu em nosso estabelecimento no dia {date} das {startTime} até as {endTime}.
                </p>
            </div>

            <div className="certificate-signature">
                {professionalDetails && professionalDetails.assinatura && (
                    <img src={`data:image/png;base64,${professionalDetails.assinatura}`} alt="Assinatura" />
                )}
                <div className="doctor-info">
                    {professionalDetails && (
                        <>
                            {professionalDetails.nome}<br />
                            {professionalDetails.titulo}<br />
                            {professionalDetails.registro_profissional}<br /><br />
                        </>
                    )}

                </div>
            </div>
            <div className="footer">
                {professionalDetails && (
                    <>
                        <div className='certificate-contato'>
                            {companyDetails && (
                                <div className='certificate-itens'>
                                    <img src={insta} alt={`Instagram de ${professionalDetails.nome}`} />
                                    <p>
                                        {companyDetails.instagram && companyDetails.instagram.startsWith('@') ? companyDetails.instagram.slice(1) : companyDetails.instagram}
                                    </p>
                                </div>
                            )}
                            {companyDetails && (
                                <div className='certificate-itens'>
                                    <img src={wp} alt={`WhatsApp de ${professionalDetails.nome}`} />
                                    <p>{companyDetails.telefone}</p>
                                </div>
                            )}
                        </div>
                        {companyDetails && (
                            <div className='certificate-endereco'>
                                <p><CompassOutlined /> {companyDetails.endereco}<br /></p>
                                <p>Emitido em, {getCurrentDateFormatted()}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="qr-code-container">
                <p>Confirme a declaração acessando o QrCode</p>
                {qrCodeUrl && (
                    <>
                        <QRCode size={90} key={qrCodeUrl} value={qrCodeUrl} />
                    </>
                )}
            </div>
        </div>
    );
});

export default DeclarationPage;