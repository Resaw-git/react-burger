import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <AppHeader />
      <Router>
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
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
