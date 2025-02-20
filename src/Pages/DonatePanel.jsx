import React from "react";
import styles from "../styles/DonatePanel.module.css";

const DonatePanel = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.imageContainer}>
        <img
          src="https://via.placeholder.com/600x400"
          alt="Donation Banner"
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Support a Better Future</h2>
        <p className={styles.content}>
          Your donation can make a difference. Join us in creating a better
          world by supporting education, healthcare, and sustainability
          projects.
        </p>
        <button
          className={styles.button}
          onClick={() => alert("Redirect to Donate Page!")}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default DonatePanel;
