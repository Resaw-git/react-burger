import React, { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ILocation } from "../../utils/types";
import { isActiveText } from "../../lib/active-text";

const AppHeader: FC = () => {
  const location = useLocation<ILocation>();


  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.leftside}>
          <NavLink
            to="/"
            exact={true}
            className={
              styles.element_leftside +
              " text_type_main-default text_color_inactive"
            }
            activeClassName={styles.active}
          >
            <BurgerIcon type={isActiveText("/", location)} />
            <div className="pl-2" />
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            isActive={() => isActiveText("/feed", location) === "primary"}
            className={
              styles.element_leftside +
              " text_type_main-default text_color_inactive pl-2"
            }
            exact={true}
            activeClassName={styles.active}
          >
            <ListIcon type={isActiveText("/feed", location)} />
            <div className="pl-2" />
            Лента заказов
          </NavLink>
        </div>

        <Link to="/" className={styles.center}>
          <Logo />
        </Link>

        <div className={styles.rightside}>
          <NavLink
            to="/profile"
            isActive={() => isActiveText("/profile", location) === "primary"}
            className={
              styles.element + " text_type_main-default text_color_inactive"
            }
            activeClassName={styles.active}
          >
            <ProfileIcon type={isActiveText("/profile", location)} />
            <div className="pl-2" />
            Личный кабинет
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
