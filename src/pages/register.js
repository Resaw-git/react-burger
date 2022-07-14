import React from "react";
import styles from "./style.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page_box}>
          <p className="text text_type_main-medium">Регистрация</p>
          <div className={"mb-6"} />
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
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
            Зарегистрироваться
          </Button>
          <div className={"mb-20"} />
          <p className={"text text_color_inactive text_type_main-default"}>
            Уже зарегистрированы?
            <button className={styles.button}>Войти</button>
          </p>
        </div>
      </div>
    </main>
  );
};
