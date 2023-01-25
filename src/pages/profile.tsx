import React, {FC, FormEvent, useEffect, useRef} from "react";
import styles from "./style.module.css";
import {
  Input,
  PasswordInput,
  Button
} from "../components/shared";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import {
  editUserData,
  getUserData,
  hideMessage,
  refreshToken,
  userLogout,
} from "../services/actions/user";
import {NavLink} from "react-router-dom";
import {useForm} from "../hooks/use-form";


export const Profile: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatchHook();
  const { userName, userEmail, jwtExpired, jwtInvalid, editSuccess } =
      useSelectorHook((store) => store.user);

  const {values, handleChange, setValues} = useForm({name: "", password: "", email: "", token: ""});

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
    if (userName && userEmail) {
      setValues({ ...values, name: userName, email: userEmail });
    }
    if (jwtExpired) {
      dispatch(refreshToken());
    }
    if (editSuccess) {
      setTimeout(() => {
        hideMessage(dispatch);
      }, 2000);
    }
  }, [dispatch, userName, userEmail, jwtInvalid, jwtExpired, editSuccess]);


  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const cancelChange = () => {
    setValues({ ...values, name: userName, email: userEmail });
  };

  const saveChange = (e: FormEvent) => {
    e.preventDefault();
    dispatch(editUserData(values));
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
            onChange={handleChange}
            value={values.name}
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
            onChange={handleChange}
            value={values.email}
            name={"email"}
            ref={inputRef}
            onIconClick={onIconClick}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={"mb-6"} />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
          />
          <div className={"mb-6"} />
          {(values.name !== userName || values.email !== userEmail) && (
            <div className={styles.buttons}>
              <Button onClick={cancelChange} type="secondary" size="medium" htmlType="reset">
                Отмена
              </Button>
              <Button type="primary" size="large" htmlType="submit">
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
