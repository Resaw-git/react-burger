import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.container}>
          <div className={styles.leftside}>
            <a href="/" className={styles.element_leftside}>
              <BurgerIcon type="primary" />
              <p className="text_type_main-default pl-2">Конструктор</p>
            </a>

            <a href="/" className={styles.element_leftside}>
              <ListIcon type="secondary" />
              <p className="text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </a>
          </div>

          <a href="/" className={styles.center}>
            <Logo />
          </a>

          <div className={styles.rightside}>
            <a href="/" className={styles.element}>
              <ProfileIcon type="secondary" />
              <p className="text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </p>
            </a>
          </div>
        </nav>
    </header>
  );
};

export default AppHeader;
