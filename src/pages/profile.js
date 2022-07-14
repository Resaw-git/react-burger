import React from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.box}>
          <a className={styles.link_active}>
            <p className="text text_type_main-large">Профиль</p>
          </a>
          <a className={styles.link}>
            <p className="text text_type_main-large">История заказов</p>
          </a>
          <a className={styles.link}>
            <p className="text text_type_main-large">Выход</p>
          </a>
          <div className={"mb-20"} />
          <div className={styles.text_info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <div className={styles.page_box}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"e-mail"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <Input
            type={"text"}
            placeholder={"Логин"}
            name={"e-mail"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            name={"e-mail"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <div className={styles.buttons}>
            <Button type="secondary" size="medium">
              Отмена
            </Button>
            <Button type="primary" size="large">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
