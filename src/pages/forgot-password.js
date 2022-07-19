import React from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page_box}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <div className="mb-6" />
          <Input
            type="text"
            placeholder="Укажите e-mail"
            name="e-mail"
            error={false}
            errorText="Ошибка"
            size="default"
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
        </div>
      </div>
    </main>
  );
};
