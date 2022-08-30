import React from "react";
import styles from './styles.module.scss';

type Props = {
  type: 'success' | 'error';
  message: string;
  close: () => void;
}

const Popup = ({ type, message, close }: Props) => {
  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          close();
        }
      }}
    >
      <div className={styles.popup}>

        <button
          onClick={close}
          className={styles.buttonClose}
        >
          <img src="./icons/icon-close.svg" alt="close" />
        </button>

        {type === 'success' && <img className={styles.emoji} src='./icons/happy.png' alt="happy" />}
        {type === 'error' && <img className={styles.emoji} src='./icons/sad.png' alt="sad" />}

        <p className={styles[type]}>{message}</p>
      </div>
    </div>
  )
}

export default Popup