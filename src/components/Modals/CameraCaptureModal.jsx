import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Divider } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const CameraCaptureModal = ({ isOpenCameraModal, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      if (isOpenCameraModal && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing the camera", error);
        }
      }
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    startCamera();

    return stopCamera;
  }, [isOpenCameraModal]);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        onCapture(imageUrl);
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      });
    }
  };

  return (
    <>
      <Modal
        title="Captura de foto 📸"
        open={isOpenCameraModal} onCancel={() => {
          onClose(); 
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Garante que a câmera seja desligada ao fechar o modal
            videoRef.current.srcObject = null;
          }
        }} footer={null}>
        <Divider />
        {capturedImage ? (
          <img src={capturedImage} alt="Capturada" style={{ width: '100%' }} />
        ) : (
          <video ref={videoRef} autoPlay style={{ width: '100%', transform: 'scaleX(-1)' }}></video>
        )}
        <Divider />
        <Button type="primary" onClick={captureImage} style={{ marginTop: '10px', width: '100%' }}>
          <CameraOutlined /> Tirar Foto
        </Button>
      </Modal>
    </>
  );
};

export default CameraCaptureModal;
