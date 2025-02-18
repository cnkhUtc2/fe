import React from "react";
import styles from "./Panel.module.css";

const Panel = ({ title, content, buttonText, onButtonClick, imageSrc }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.content}>{content}</p>
                {buttonText && (
                    <button className={styles.button} onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
            </div>
            {imageSrc && (
                <div className={styles.imageContainer}>
                    <img src={imageSrc} alt="Panel Illustration" className={styles.image} />
                </div>
            )}
        </div>
    );
};

export default Panel;
