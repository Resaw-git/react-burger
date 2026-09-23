import React, { FC } from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "../shared";
import desktop from "./header.desktop.module.css";
import mobile from "./header.mobile.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { isActiveText } from "../../lib/active-text";
import { openMobileMenu } from "../../services/actions/modal";
import { useDispatchHook } from "../../hooks/redux";
import { useIsMobile } from "../../hooks/use-media-query";

const Header: FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const dispatch = useDispatchHook();

  const handleMenu = () => {
    openMobileMenu(dispatch);
  };

  return (
    <header className={desktop.header}>
      {!isMobile ? (
        <nav className={desktop.nav}>
          <div className={desktop.leftside}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                desktop.element_leftside +
                " text_type_main-default text_color_inactive" +
                (isActive ? " " + desktop.active : "")
              }
            >
              <BurgerIcon type={isActiveText("/", location)} />
              <div className="pl-2" />
              Конструктор
            </NavLink>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                desktop.element_leftside +
                " text_type_main-default text_color_inactive pl-2" +
                (isActive || isActiveText("/feed", location) === "primary" ? " " + desktop.active : "")
              }
            >
              <ListIcon type={isActiveText("/feed", location)} />
              <div className="pl-2" />
              Лента заказов
            </NavLink>
          </div>

          <Link to="/" className={desktop.center}>
            <Logo />
          </Link>

          <div className={desktop.rightside}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                desktop.element +
                " text_type_main-default text_color_inactive" +
                (isActive || isActiveText("/profile", location) === "primary" ? " " + desktop.active : "")
              }
            >
              <ProfileIcon type={isActiveText("/profile", location)} />
              <div className="pl-2" />
              Личный кабинет
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className={mobile.nav}>
          <NavLink
              to="/"
              className={mobile.logo}>
            <img src="/src/assets/images/logo-mobile.svg" alt="логотип" />
          </NavLink>
          <div className={mobile.menu} onClick={handleMenu}>
            <div className={mobile.menu_line} />
            <div className={mobile.menu_line} />
            <div className={mobile.menu_line} />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
