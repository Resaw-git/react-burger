import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserData,
  getUserData,
  hideMessage,
  refreshToken,
  userLogout,
} from "../services/actions/user";
import { NavLink } from "react-router-dom";

export const Profile = () => {
  const timerRef = useRef(null);
  const [form, setForm] = useState({ name: "", password: "", email: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const { userName, userEmail, jwtExpired, jwtInvalid, editSuccess } =
    useSelector((store) => store.user);

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
    if (userName && userEmail) {
      setForm({ ...form, name: userName, email: userEmail });
    }
    if (jwtExpired) {
      dispatch(refreshToken());
    }
    if (editSuccess) {
      timerRef.current = setTimeout(() => {
        hideMessage(dispatch);
      }, 2000);
    }
  }, [dispatch, userName, userEmail, jwtInvalid, jwtExpired, editSuccess]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const cancelChange = () => {
    setForm({ ...form, name: userName, email: userEmail });
  };

  const saveChange = (e) => {
    e.preventDefault();
    dispatch(editUserData(form));
  };

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.box}>
          <NavLink
            to="/profile"
            exact={true}
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <div className={styles.link}>
            <p onClick={logout} className="text text_type_main-medium">
              Выход
            </p>
          </div>
          <div className={"mb-20"} />
          <div className={styles.text_info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <form className={styles.form} onSubmit={saveChange}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
            name={"name"}
            ref={inputRef}
            onIconClick={onIconClick}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            ref={inputRef}
            onIconClick={onIconClick}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            autocomplete="current-password"
          />
          <div className={"mb-6"} />
          {(form.name !== userName || form.email !== userEmail) && (
            <div className={styles.buttons}>
              <Button onClick={cancelChange} type="secondary" size="medium">
                Отмена
              </Button>
              <Button type="primary" size="large">
                Сохранить
              </Button>
            </div>
          )}
          {editSuccess && (
            <div className={"mt-6"}>
              <p className={"text text_color_success text_type_main-default"}>
                Данные успешно изменены
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
