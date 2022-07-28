import React, { useEffect } from "react";
import styles from "./style.module.css";
import {Link, Redirect, useLocation} from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { autorization } from "../services/actions/login";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";
import { useForm } from "../hooks/use-form";

export const Login = () => {
  const location = useLocation()

  const { values, handleChange } = useForm({ password: "", email: "" });
  const inputRef = React.useRef(null);

  const dispatch = useDispatch();
  const { loginMessage, loginSuccess, loginFailed } = useSelector(
    (store) => store.login
  );

  const { jwtExpired, jwtInvalid, userRequest, userFailed } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
    if (jwtExpired) {
      dispatch(refreshToken());
    }
  }, [dispatch, jwtInvalid, jwtExpired]);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const auth = (e) => {
    e.preventDefault();
    autorization(values, dispatch);
  };

  if (loginSuccess) {
    return <Redirect to={location.state?.from || "/"} />;
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
          <form className={styles.form} onSubmit={auth}>
            <p className="text text_type_main-medium">Войти</p>
            <div className={"mb-6"} />
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
            <div className={"mb-6"} />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
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
        )}
      </div>
    </main>
  );
};
