import {useSelector} from "react-redux";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {FC} from "react";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    // @ts-ignore
    const { loginSuccess } = useSelector((store) => store.login);

    return (
        <Route
            {...rest}
            render={({ location }): any =>
                loginSuccess ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
};