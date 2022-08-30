import { useEffect, useState } from "react";

import styles from './styles.module.scss';

import { sendApiForm } from "../../services/api";

import Fullname from '../fullname/Fullname';
import Email from "../email/Email";
import Phone from "../phone/Phone";
import Date from "../date/Date";
import Message from "../message/Message";
import Popup from "../popup/Popup";


const Form = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');

  const [message, setMesssage] = useState('');
  const [messageError, setMessageError] = useState('');

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const [formValid, setFormValid] = useState(false);

  // зависимости ошибок
  useEffect(() => {
    (nameError || emailError || phoneError || dateError || messageError)
      ? setFormValid(false) : setFormValid(true);
  }, [nameError, emailError, phoneError, dateError, messageError]);

  const sendForm = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    // не отправит на сервер если форма не валидная
    if (!formValid) {
      return;
    }

    let response;
    try {
      response = await sendApiForm({ name, email, phone, date, message });
    } catch (error) {
      setIsErrorMessage(true);
    }

    if (response) {
      setName('')
      setEmail('')
      setPhone('')
      setDate('')
      setMesssage('')
      setIsSuccessMessage(true);
    }

    console.log(response);
  };

  return (
    <>
      <form className={styles.form} noValidate>
        <h2>Форма обратной связи</h2>

        <Fullname
          name={name}
          setName={setName}
          nameError={nameError}
          setNameError={setNameError}
        />

        <Email
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
        />

        <Phone
          phone={phone}
          setPhone={setPhone}
          phoneError={phoneError}
          setPhoneError={setPhoneError}
        />

        <Date
          date={date}
          setDate={setDate}
          dateError={dateError}
          setDateError={setDateError}
        />

        <Message
          message={message}
          setMesssage={setMesssage}
          messageError={messageError}
          setMessageError={setMessageError}
        />

        <button
          className={styles.button}
          onClick={sendForm}
          disabled={!formValid || !name}
        >
          Отправка формы
        </button>
      </form>
      {/* {isSuccessMessage && (
        <Popup
          type="success"
          message="Форма успешно отправлена"
          close={() => setIsSuccessMessage(false)}
        />
      )}
      {isErrorMessage && (
        <Popup
          type="error"
          message="Форма не отправленна"
          close={() => setIsErrorMessage(false)}
        />
      )} */}
      {(isSuccessMessage && (
          <Popup
            type="success"
            message="Форма успешно отправлена"
            close={() => setIsSuccessMessage(false)}
          />)) || (isErrorMessage && (
            <Popup
              type="error"
              message="Форма не отправленна"
              close={() => setIsErrorMessage(false)}
            />)
        )
      }
    </>
  )
};

export default Form;