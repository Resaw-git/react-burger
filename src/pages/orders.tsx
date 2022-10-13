import React, {FC, useEffect, useRef} from "react";
import styles from "./style.module.css";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import {
    getUserData,
    hideMessage,
    refreshToken,
    userLogout,
} from "../services/actions/user";
import {NavLink, useHistory} from "react-router-dom";
import {SET_USER_SUCCESS} from "../services/actions/order";



export const Orders: FC = () => {
    const history = useHistory()
    const timerRef = useRef(0);
    const dispatch = useDispatchHook();
    const { userName, userEmail, jwtExpired, jwtInvalid, editSuccess } =
        useSelectorHook((store) => store.user);

    const {userAccess} = useSelectorHook(store => store.order)

    useEffect(() => {
        if (!jwtInvalid) {
            dispatch(getUserData());
        }
        if (jwtExpired) {
            dispatch(refreshToken());
        }
        if (editSuccess) {
            timerRef.current = window.setTimeout(() => {
                hideMessage(dispatch);
            }, 2000);
        }
    }, [dispatch, userName, userEmail, jwtInvalid, jwtExpired, editSuccess]);


    const logout = () => {
        dispatch(userLogout());
    };

    if (userAccess) {
        dispatch({
            type: SET_USER_SUCCESS,
            userAccess: false
        })
        history.push('/')
    }

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
                <div className="ml-15 mt-10">

                </div>

            </div>
        </main>
    );
};
