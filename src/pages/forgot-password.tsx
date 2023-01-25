import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
} from "../components/shared";
import { Link, Redirect } from "react-router-dom";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";
import { sendEmail } from "../services/actions/reset-password";
import { useForm } from "../hooks/use-form";

export const ForgotPassword = () => {
  const dispatch = useDispatchHook();
  const inputRef = useRef<HTMLInputElement>(null);
  const [redirect, setRedirect] = useState(false);
  const { jwtExpired, jwtInvalid, userRequest, userSuccess, userFailed } =
    useSelectorHook((store) => store.user);
  const { message, sendSuccess, sendFailed } = useSelectorHook(
    (store) => store.reset
  );

  const { values, handleChange } = useForm({
    name: "",
    password: "",
    email: "",
    token: "",
  });

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
    if (jwtExpired) {
      dispatch(refreshToken());
    }
    if (sendSuccess) {
      setRedirect(true);
    }
  }, [dispatch, sendSuccess, jwtInvalid, jwtExpired]);

  if (userSuccess) {
    return <Redirect to="/profile" />;
  }

  if (redirect) {
    return <Redirect to="/reset-password" />;
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const resetPassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(sendEmail(values));
  };

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
              onChange={handleChange}
              value={values.email}
              name={"email"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <div className="mb-6" />
            <Button type="primary" size="large" htmlType="submit">
              Восстановить
            </Button>
            {sendFailed && (
              <div className={"mt-6"}>
                <p className={"text text_color_error text_type_main-default"}>
                  {message}
                </p>
              </div>
            )}
            {sendSuccess && (
              <div className={"mt-6"}>
                <p className={"text text_color_success text_type_main-default"}>
                  {message}
                </p>
              </div>
            )}
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
