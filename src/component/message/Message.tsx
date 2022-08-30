import { useCallback} from 'react';

import styles from '../styles/styles.module.scss';

type Props = {
  message: string;
  setMesssage: (value: string) => void;
  messageError: string;
  setMessageError: (value: string) => void;
}

const Message = ({message, setMesssage, messageError, setMessageError}: Props) => {

  const validateMessage = (value: string): void => {
    if (value.length >= 300 || value.length <= 10) {
      setMessageError('Сообщение должно быть больше 10 символов и меньше 300');
    } else {
      setMessageError('');
    }
  };

  const messageHandler = useCallback((value: string): void => {
    setMesssage(value);
    validateMessage(value);
  }, []);

  const focusHandler = (): void => {
    setMessageError('');
  };

  const blurHandler = (): void => {
    validateMessage(message);
  };

  return (
    <div className={styles.div}>
      {Boolean(messageError)
        ? <p className={styles.inputErrorText}>{messageError}</p>
        : <p className={styles.inputTitle}>Сообщение</p>
      }

      <textarea
        className={styles.input}
        value={message}
        rows={2}
        placeholder='Сообщение'
        onChange={(event) => messageHandler(event.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
    </div>
  )
}

export default Message;