import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../services/actions/user";

export const Profile = () => {
  const [form, setForm] = useState({ name: "", password: "", email: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  const { userName, userEmail } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserData());
    if (userName && userEmail) {
      setForm({ ...form, name: userName, email: userEmail });
    }
  }, [userName, userEmail]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const cancelChange = () => {
    setForm({ ...form, name: userName, email: userEmail });
  }

  const saveChange = e => {
    e.preventDefault()
    console.log('test')
  }

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.box}>
          <a className={styles.link_active}>
            <p className="text text_type_main-medium">Профиль</p>
          </a>
          <a className={styles.link}>
            <p className="text text_type_main-medium">История заказов</p>
          </a>
          <a className={styles.link}>
            <p className="text text_type_main-medium">Выход</p>
          </a>
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
        </form>
      </div>
    </main>
  );
};
