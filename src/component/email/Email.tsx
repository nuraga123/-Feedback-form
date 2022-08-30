import { useCallback } from 'react';

import styles from '../styles/styles.module.scss';

type Props = {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
};

const Email = ({ email, setEmail, emailError, setEmailError }: Props) => {

  const validateEmail = (value: string): void => {
    const regularEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const result = regularEmail.test(String(value).toLowerCase());

    !result ? setEmailError('введите корректный e-mail') : setEmailError('');
  };

  const emailHandler = useCallback((value: string): void => {
    setEmail(value);
    validateEmail(value);
  }, []);

  const focusHandler = (): void => {
    setEmailError('');
  };

  const blurHandler = (): void => {
    emailHandler(email);
  };

  return (
    <div className={styles.div}>
      {Boolean(emailError)
        ? <p className={styles.inputErrorText}>{emailError}</p>
        : <p className={styles.inputTitle}>Email</p>
      }

      <input
        className={styles.input}
        value={email}
        type='text'
        placeholder='E-mail'
        onChange={(event) => emailHandler(event.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
    </div>
  )
}

export default Email;