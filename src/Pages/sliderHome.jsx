import React, { useState } from 'react';
import './Slider.css';
import styles from "./Slider.module.css";

const images = [
    'https://via.placeholder.com/600x300/FF5733',
    'https://via.placeholder.com/600x300/33FF57',
    'https://via.placeholder.com/600x300/5733FF',
];

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="slider">
            <button className="slider-button prev" onClick={prevSlide}>
                &#8249;
            </button>
            <div className={styles.sliderContent}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="slider-button next" onClick={nextSlide}>
                &#8250;
            </button>
        </div>
    );
}

export default Slider;
