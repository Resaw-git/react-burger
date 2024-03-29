import React, {FormEvent, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import { getUserData, refreshToken } from "../services/actions/user";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Loader from "../components/loader/loader";
import { resetPassword } from "../services/actions/reset-password";
import { useForm } from "../hooks/use-form";
import {ILocation} from "../utils/types";

export const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatchHook();
  const location = useLocation<ILocation>();
  const [redirect, setRedirect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { jwtExpired, jwtInvalid, userRequest, userSuccess, userFailed } =
      useSelectorHook((store) => store.user);
  const { sendSuccess, resetSuccess } = useSelectorHook((store) => store.reset);

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
    if (resetSuccess) {
      setRedirect(true);
    }
  }, [dispatch, jwtExpired, jwtInvalid, resetSuccess]);

  if (history.length === 1 || !sendSuccess) {
    return <Redirect to="/forgot-password" />;
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

  const changePassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values));
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
          <form className={styles.form} onSubmit={changePassword}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className={"mb-6"} />
            <Input
              type={"text"}
              placeholder={"Введите новый пароль"}
              onChange={handleChange}
              value={values.password}
              icon={"ShowIcon"}
              name={"password"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <div className={"mb-6"} />
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              value={values.token}
              name={"token"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <div className={"mb-6"} />
            <Button type="primary" size="large" htmlType="submit">
              Сохранить
            </Button>
            <div className={"mb-20"} />
            <p className={"text text_color_inactive text_type_main-default"}>
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
