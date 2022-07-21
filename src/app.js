import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppHeader from "./components/app-header/app-header";
import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
} from "./pages";
import { useSelector } from "react-redux";

const App = () => {
  const ProtectedRoute = ({ children, ...rest }) => {
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

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
