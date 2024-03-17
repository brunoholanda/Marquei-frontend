import React, { useState } from 'react';
import { Modal, Button, Divider } from 'antd';
import CalledModal from './calledModal';


const FreeMonthlyModal = ({ freeMonthlyModalisVisible, freeMonthlyModalisClose }) => {
    const [showCalledModal, setShowCalledModal] = useState(false);
    const handleOpenCalled = () => {
        setShowCalledModal(true);
    };
    return (
        <>
            <Modal
                title="Mensalidade Grátis 💸"
                open={freeMonthlyModalisVisible}
                onCancel={() => {
                    freeMonthlyModalisClose();
                }}
                footer={null}

            >
                <Divider />
                <h3>Indique um amigo e aguarde nosso contato, vamos analisar a contratação do seu amigo e então você pode receber um desconto total ou parcial no seu plano.</h3>
                <p>Caso precise você pode abrir um chamado para acompanhar sua indicação.</p>
                <Button
                    style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                    type="primary" onClick={handleOpenCalled}>
                    Abrir Chamado
                </Button>
            </Modal>
            <CalledModal
                isVisible={showCalledModal}
                onClose={() => setShowCalledModal(false)}
            />
        </>
    );
};

export default FreeMonthlyModal;
