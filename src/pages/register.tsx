import React, {FormEvent, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {Link, Redirect, useLocation} from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import { registration } from "../services/actions/register";
import { getUserData, refreshToken } from "../services/actions/user";
import Loader from "../components/loader/loader";
import { useForm } from "../hooks/use-form";
import {ILocation} from "../utils/types";

export const Register = () => {
  const location = useLocation<ILocation>()
  const timerRef = useRef(0);
  const [redirect, setRedirect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatchHook();
  const { registerMessage, registerSuccess, registerFailed } = useSelectorHook(
    (store) => store.register
  );

  const { jwtExpired, jwtInvalid, userRequest, userSuccess, userFailed } =
      useSelectorHook((store) => store.user);

  const { values, handleChange, setValues } = useForm({
    name: "",
    password: "",
    email: "",
    token: ""
  });

  useEffect(() => {
    if (registerSuccess) {
      setValues({ name: "", password: "", email: "", token: "" });
      timerRef.current = window.setTimeout(() => {
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
    return <Redirect to={location.state?.from || "/"} />;
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const sendForm = (e: FormEvent) => {
    e.preventDefault();
    registration(values);
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
              onChange={handleChange}
              value={values.name}
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
            <Button type="primary" size="large" htmlType="submit">
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
