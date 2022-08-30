import { useCallback } from 'react';

import styles from '../styles/styles.module.scss';

type Props = {
  name: string;
  setName: (value: string) => void;
  nameError: string;
  setNameError: (value: string) => void;
}

const Fullname = ({ name, setName, nameError, setNameError }: Props) => {

  // проверка имени на латинский алфавит
  const validateLatinCharacters = (value: string): boolean => {
    return /^[a-zA-Z\s.,]+$/.test(value);
  }

  // замена пробелов на 1 пробел
  const removeExtraSpaces = (value: string, withTrim: boolean = false): string => {
    const result = value.replace(/\s+/g, ' ')
    return withTrim ? result.trim() : result;
  }

  // разрывает строку на массив из строк
  const splitName = (value: string): string[] => {
    return removeExtraSpaces(value, true).split(' ');
  }

  // проверка имени на 2 слова
  const validateTwoWords = (value: string): boolean => {
    return splitName(value).length === 2;
  }

  // проверка длинны каждого слова
  const validateLength = (value: string): boolean => {
    return splitName(value)
      .every(word => word.length >= 3 && word.length <= 30);
  }

  // валидация и вывод ошибок
  const validateName = (value: string): void => {
    if (!validateLatinCharacters(value)) {
      setNameError('Введите буквы латинского алфавита');
    } else if (!validateTwoWords(value)) {
      setNameError('Введите только имя и фамилию');
    } else if (!validateLength(value)) {
      setNameError('Введите имя и фамилию больше 3 и меньше 30 букв');
    } else {
      setNameError('');
    }
  }

  // обработчик ввода имени
  const nameHandler = useCallback((value: string): void => {
    const newName = value.toUpperCase();
    setName(removeExtraSpaces(newName));
    validateName(newName);
  }, []);

  const focusHandler = (): void => {
    setNameError('');
  }

  const blurHandler = (): void => {
    setName(removeExtraSpaces(name, true));
    validateName(name);
  }

  return (
    <div className={styles.div}>
      {Boolean(nameError)
        ? <p className={styles.inputErrorText}>{nameError}</p>
        : <p className={styles.inputTitle}>Имя и Фамилия</p>
      }

      <input
        className={styles.input}
        value={name}
        type='text'
        placeholder='Имя Фамилия'
        onChange={(event) => nameHandler(event.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
    </div>
  )
};

export default Fullname;