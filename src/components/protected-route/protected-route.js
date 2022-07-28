import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
    const { loginSuccess } = useSelector((store) => store.login);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loginSuccess ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
};