import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const isActive = (route, location) => {
    const reg = location.pathname.match(/^\/[a-z]*/)
    if (reg) {
      return route === reg[0] ? "primary" : "secondary"
      }

    return route === location.pathname ? "primary" : "secondary";
  };

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
            <BurgerIcon type={isActive("/", location)} />
            <div className="pl-2" />
            Конструктор
          </NavLink>
          <NavLink
            to="/orders"
            className={
              styles.element_leftside +
              " text_type_main-default text_color_inactive pl-2"
            }
            exact={true}
            activeClassName={styles.active}
          >
            <ListIcon type={isActive("/orders", location)} />
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
            className={
              styles.element + " text_type_main-default text_color_inactive"
            }
            activeClassName={styles.active}
          >
            <ProfileIcon type={isActive("/profile", location)} />
            <div className="pl-2" />
            Личный кабинет
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
