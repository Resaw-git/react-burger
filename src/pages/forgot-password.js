import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";
import {sendEmail} from "../services/actions/reset-password";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({ email: "" });
  const { jwtExpired, jwtInvalid, userRequest, userSuccess, userFailed } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
  }, []);

  if (jwtExpired) {
    dispatch(refreshToken());
  }

  if (userSuccess) {
    return <Redirect to="/profile"/>
  }

  if (redirect) {
    return <Redirect to="/reset-password"/>
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const resetPassword = (e) => {
    e.preventDefault()
    sendEmail(dispatch, form.email)
    if (form.email !== "") {
      setRedirect(true)
    }
  }


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {userRequest && !userFailed && (
          <div className={styles.info}>
            <Loader />
          </div>
        )}
        {userFailed && (
          <form className={styles.form} onSubmit={resetPassword}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className="mb-6" />
            <Input
                type={"text"}
                placeholder={"E-mail"}
                onChange={onChange}
                value={form.email}
                name={"email"}
                ref={inputRef}
                onIconClick={onIconClick}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
            />
            <div className="mb-6" />
            <Button type="primary" size="large">
              Восстановить
            </Button>
            <div className="mb-20" />
            <p className="text text_color_inactive text_type_main-default">
              Вспомнили пароль?
              <Link to="/login">
                <button className={styles.button}>Войти</button>
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};
