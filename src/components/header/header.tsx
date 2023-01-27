import React, { FC, useEffect, useState } from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "../shared";
import desktop from "./header.desktop.module.css";
import mobile from "./header.mobile.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ILocation } from "../../utils/types";
import { isActiveText } from "../../lib/active-text";
import { openMobile } from "../../services/actions/modal";
import { useDispatchHook } from "../../hooks/redux";

const Header: FC = () => {
  const location = useLocation<ILocation>();
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatchHook();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  const handleMenu = () => {
    openMobile(dispatch);
  };

  return (
    <header className={desktop.header}>
      {width >= 1280 ? (
        <nav className={desktop.nav}>
          <div className={desktop.leftside}>
            <NavLink
              to="/"
              exact={true}
              className={desktop.element_leftside + " text_type_main-default text_color_inactive"}
              activeClassName={desktop.active}
            >
              <BurgerIcon type={isActiveText("/", location)} />
              <div className="pl-2" />
              Конструктор
            </NavLink>
            <NavLink
              to="/feed"
              isActive={() => isActiveText("/feed", location) === "primary"}
              className={desktop.element_leftside + " text_type_main-default text_color_inactive pl-2"}
              exact={true}
              activeClassName={desktop.active}
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
              isActive={() => isActiveText("/profile", location) === "primary"}
              className={desktop.element + " text_type_main-default text_color_inactive"}
              activeClassName={desktop.active}
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
