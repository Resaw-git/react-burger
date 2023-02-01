import React, { FC, useEffect, useState } from "react";
import styles from "./mobile-menu.module.css";
import ReactDOM from "react-dom";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import { BurgerIcon, CloseIcon, ListIcon, ProfileIcon } from "../shared";
import { ILocation } from "../../utils/types";
import { isActiveText } from "../../lib/active-text";
import { userLogout } from "../../services/actions/user";
import { useDispatchHook } from "../../hooks/redux";

interface IComponentProps {
  onClose: () => void;
}

const MobileMenu: FC<IComponentProps> = ({ onClose }) => {
  const history = useHistory();
  const [subMenu, setSubMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatchHook();

  const toggleSubMenu = () => {
    setSubMenu(!subMenu);
  };

  const logout = () => {
    dispatch(userLogout(history));
    onClose();
  };

  const location = useLocation<ILocation>();
  const escapeModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile" || location.pathname === "/profile/orders") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  useEffect(() => {
    document.addEventListener("keydown", escapeModal);
    return () => {
      document.removeEventListener("keydown", escapeModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.menu}>
        <div className={styles.title}>
          <p className={styles.text}>Меню</p>
          <div className={styles.cross}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <nav className={styles.nav}>
          <div className={styles.account} onClick={toggleSubMenu}>
            <div className={`${styles.item} ${isActive && styles.active}`}>
              <ProfileIcon type={isActiveText("/profile", location)} />
              <div className="pl-2" />
              Личный кабинет
            </div>
            <div className={`${styles.triangle} ${subMenu && styles.rotate} ${isActive && styles.active}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.9541 15.6475C11.5164 16.1175 12.4836 16.1175 13.0459 15.6475L17.6243 11.8214C18.4585 11.1242 17.8129 10 16.5783 10H7.42166C6.1871 10 5.54152 11.1242 6.37574 11.8214L10.9541 15.6475Z"
                  fill="#8585AD"
                />
              </svg>
            </div>
          </div>
          {subMenu && (
            <>
              <NavLink
                to="/profile"
                exact={true}
                className={styles.submenu}
                activeClassName={styles.active}
                onClick={onClose}
              >
                Профиль
              </NavLink>
              <NavLink
                to="/profile/orders"
                exact={true}
                className={styles.submenu}
                activeClassName={styles.active}
                onClick={onClose}
              >
                История заказов
              </NavLink>
              <NavLink to="/" className={styles.submenu} onClick={logout}>
                Выход
              </NavLink>
            </>
          )}
          <NavLink
            to="/"
            className={styles.item}
            isActive={() => isActiveText("/", location) === "primary"}
            activeClassName={styles.active}
            onClick={onClose}
          >
            <BurgerIcon type={isActiveText("/", location)} />
            <div className="pl-2" />
            Конструктор бургеров
          </NavLink>
          <NavLink
            to="/feed"
            className={styles.item}
            isActive={() => isActiveText("/feed", location) === "primary"}
            activeClassName={styles.active}
            onClick={onClose}
          >
            <ListIcon type={isActiveText("/feed", location)} />
            <div className="pl-2" />
            Лента заказов
          </NavLink>
        </nav>
      </div>
    </>,
    document.getElementById("mobile-menu") as HTMLElement,
  );
};

export default MobileMenu;
