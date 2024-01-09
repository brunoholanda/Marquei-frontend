import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Make sure to create an appropriate CSS file to style the components
import imagea from '../../../public/carrossel/1.png';
import imageb from '../../../public/home/mens.png';
import imagec from '../../../public/carrossel/3.png';
import imaged from '../../../public/carrossel/2.png';
import { ClockCircleOutlined, ControlOutlined, FormOutlined, HeartOutlined } from '@ant-design/icons';
import Btn from 'components/Btn';

const carouselData = [
    {
        title: "Gerencie sua clínica",
        description: "Gestão clínica simplificada para você focar no seu paciente",
        imageUrl: imagea,
        icon: <ControlOutlined />,
    },
    {
        title: "Acompanhe em tempo real",
        description: "Acompanhe o agendamento e historico dos seus pacientes",
        imageUrl: imageb,
        icon: <HeartOutlined />,
    },
    {
        title: "Emita Declaracoes e Atestados",
        description: "Emita atestados de forma rapida e pratica",
        imageUrl: imagec,
        icon: <FormOutlined />
    },
    {
        title: "Agenda 24 horas",
        description: "Simplifique o agendamento para seus pacientes e automatize os processos repetitivos da sua clínica.",
        imageUrl: imaged,
        icon: <ClockCircleOutlined />
    }
];

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(current => (current === carouselData.length - 1 ? 0 : current + 1));
        }, 10000)

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slides">
                {carouselData.map((slide, index) => (
                    <div key={index} className={`slide ${index === activeIndex ? 'active' : ''}`}>
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <Btn>CONTRATE AGORA !</Btn>
                        </div>
                        <img src={slide.imageUrl} alt={slide.title} />
                    </div>
                ))}
            </div>


        </div>
    );
};


export default Carousel;

/*
            <div className="carousel-side-options">
                {carouselData.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`side-option ${index === activeIndex ? 'active' : ''}`}
                    >
                         <span className="side-option-icon">{slide.icon}</span>
                        <span className="side-option-title">{slide.title}</span>
                    </button>
                ))}
            </div>
            */