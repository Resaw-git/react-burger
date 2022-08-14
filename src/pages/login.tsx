import React, {FormEvent, FC, useEffect} from "react";
import styles from "./style.module.css";
import {Link, Redirect, useLocation} from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button} from "../utils/UI";
import { useDispatch, useSelector } from "react-redux";
import { autorization } from "../services/actions/login";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";
import { useForm } from "../hooks/use-form";
import {ILocation} from "../utils/types";

export const Login: FC = () => {
  const location = useLocation<ILocation>()

  const { values, handleChange } = useForm({ name: "", password: "", email: "", token: "" });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
    const { loginMessage, loginSuccess, loginFailed } = useSelector(
  // @ts-ignore
    (store) => store.login
  );

  const { jwtExpired, jwtInvalid, userRequest, userFailed } = useSelector(
      // @ts-ignore
      (store) => store.user
  );

  useEffect(() => {
    if (!jwtInvalid) {
        // @ts-ignore
        dispatch(getUserData());
    }
    if (jwtExpired) {
        // @ts-ignore
        dispatch(refreshToken());
    }
  }, [dispatch, jwtInvalid, jwtExpired]);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const auth = (e: FormEvent) => {
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
