import React, { useState } from "react";
import styles from "./style.module.css";
import {Link, Redirect} from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {authentication} from "../services/actions/login";

export const Login = () => {
  const [form, setForm] = useState({ password: "", email: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const { loginMessage, loginSuccess, loginFailed } = useSelector(
      (store) => store.login
  );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const auth = e => {
    e.preventDefault()
    authentication(form, dispatch)
  }

  if (loginSuccess) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={auth}>
          <p className="text text_type_main-medium">Войти</p>
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
          {loginFailed && (
              <div className={"mt-6"}>
                <p className={"text text_color_error text_type_main-default"}>
                  {loginMessage}
                </p>
              </div>
          )}
          <div className={"mb-6"} />
          <Button type="primary" size="large">
            Войти
          </Button>
          <div className={"mb-20"} />
          <p className={"text text_color_inactive text_type_main-default"}>
            Вы — новый пользователь?
            <Link to="/register">
              <button className={styles.button}>Зарегистрироваться</button>
            </Link>
          </p>
          <div className={"mb-4"} />
          <p className={"text text_color_inactive text_type_main-default"}>
            Забыли пароль?
            <Link to="/forgot-password">
              <button className={styles.button}>Восстановить пароль</button>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
