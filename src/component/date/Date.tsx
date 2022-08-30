import { useCallback } from 'react';

import styles from '../styles/styles.module.scss';

type Props = {
  date: string;
  setDate: (value: string) => void;
  dateError: string;
  setDateError: (value: string) => void;
}

const Date = ({date, setDate, dateError, setDateError}: Props) => {
  
  // проверка даты ест ли она ?
  const validateDate = (value: string): void => {
    value === '' ? setDateError('введите дату') : setDateError('');
  };

  const dateHandler = useCallback((value: string): void => {
    setDate(value);
    validateDate(value);
  }, []);

  const focusHandler = (): void => {
    setDateError('');
  }

  const blurHandler = (): void => {
    validateDate(date);
  };

  return (
    <div className={styles.dev}>
      {Boolean(dateError)
        ? <p className={styles.inputErrorText}>{dateError}</p>
        : <p className={styles.inputTitle}>Дата рождения</p>
      }

      <input
        className={styles.input}
        value={date}
        type='date'
        placeholder='Дата рождения'
        onChange={(event) => dateHandler(event.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
    </div>
  )
};

export default Date;