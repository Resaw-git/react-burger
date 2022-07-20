import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../services/actions/register";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";

export const Register = () => {
  const timerRef = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({ name: "", password: "", email: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const { registerMessage, registerSuccess, registerFailed } = useSelector(
    (store) => store.register
  );

  const { jwtExpired, jwtInvalid, userRequest, userSuccess, userFailed } =
    useSelector((store) => store.user);

  useEffect(() => {
    if (registerSuccess) {
      setForm({ name: "", password: "", email: "" });
      timerRef.current = setTimeout(() => {
        setRedirect(true);
      }, 1250);
    }
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
  }, [registerSuccess]);

  if (jwtExpired) {
    dispatch(refreshToken());
  }

  if (userSuccess) {
    return <Redirect to="/profile" />;
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const sendForm = (e) => {
    e.preventDefault();
    registration(form, dispatch);
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
          <form className={styles.form} onSubmit={sendForm}>
            <p className="text text_type_main-medium">Регистрация</p>
            <div className={"mb-6"} />
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name={"name"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <div className={"mb-6"} />
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
            <div className={"mb-6"} />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={"password"}
            />
            {registerSuccess && (
              <div className={"mt-6"}>
                <p className={"text text_color_success text_type_main-default"}>
                  Вы успешно зарегистрированы
                </p>
              </div>
            )}
            {registerFailed && (
              <div className={"mt-6"}>
                <p className={"text text_color_error text_type_main-default"}>
                  {registerMessage}
                </p>
              </div>
            )}
            <div className={"mb-6"} />
            <Button type="primary" size="large">
              Зарегистрироваться
            </Button>
            <div className={"mb-20"} />
            <p className={"text text_color_inactive text_type_main-default"}>
              Уже зарегистрированы?
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
