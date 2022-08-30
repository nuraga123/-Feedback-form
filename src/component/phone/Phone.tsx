import { useCallback } from 'react';

import styles from '../styles/styles.module.scss';


const prefixNumber = (str: string): string => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

type Props = {
  phone: string;
  setPhone: (value: string) => void;
  phoneError: string;
  setPhoneError: (value: string) => void;
}

const Phone = ({phone, setPhone, phoneError, setPhoneError}: Props) => {

  const validatePhone = (value: string): void => {
    value.length !== 18 ? setPhoneError('введите номер полностью') : setPhoneError('');
  }

  const onPhoneChange = useCallback((text: string): void => {
    const value = text.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    if (text.includes("+8") || text[0] === "8") {
      result = "";
    } else {
      result = "+";
    }

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ") ";
          break;
        case 7:
          result += "-";
          break;
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }

    setPhone(result);
    validatePhone(result);

  }, []);

  const focusHandler = (): void => {
    setPhoneError('');
  }

  const blurHandler = (): void => {
    validatePhone(phone);
  }

  return (
    <div className={styles.div}>
      {Boolean(phoneError)
        ? <p className={styles.inputErrorText}>{phoneError}</p>
        : <p className={styles.inputTitle}>Номер</p>
      }

      <input
        className={styles.input}
        placeholder='Номер телефона'
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
    </div>
  )
}

export default Phone;