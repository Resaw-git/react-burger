import React from "react";
import styles from "./style.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page_box}>
          <p className="text text_type_main-medium">Войти</p>
          <div className={"mb-6"} />
          <Input
            type={"text"}
            placeholder={"E-mail"}
            name={"e-mail"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <PasswordInput name={"password"} />
          <div className={"mb-6"} />
          <Button type="primary" size="large">
            Войти
          </Button>
          <div className={"mb-20"} />
          <p className={"text text_color_inactive text_type_main-default"}>
            Вы — новый пользователь?
            <button className={styles.button}>
              Зарегистрироваться
            </button>
          </p>
          <div className={"mb-4"} />
          <p className={"text text_color_inactive text_type_main-default"}>
            Забыли пароль?
            <button className={styles.button}>
              Восстановить пароль
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};
