import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftside}>
          <div className={styles.element_leftside}>
            <BurgerIcon type="primary" />
            <p className="text_type_main-default pl-2">Конструктор</p>
          </div>

          <div className={styles.element_leftside}>
            <ListIcon type="secondary" />
            <p className="text_type_main-default text_color_inactive pl-2">
              Лента заказов
            </p>
          </div>
        </div>

        <div className={styles.center}>
          <Logo />
        </div>

        <div className={styles.rightside}>
          <div className={styles.element}>
            <ProfileIcon type="secondary" />
            <p className="text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
