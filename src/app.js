import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import {closeModalIng, closeModalOrd} from "./services/actions/modal";
import Modal from "./components/modal/modal";
import OrderDetails from "./components/order-details/order-details";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { modalOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const modalCloseIng = () => {
    closeModalIng(dispatch, history)
  }

  const modalCloseOrd = () => {
    closeModalOrd(dispatch)
  }

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
          {modalOpen && (
            <Modal onClose={modalCloseOrd}>
              <OrderDetails />
            </Modal>
          )}
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
        <Route path="/ingredients/:id" exact={true}>
          {background ? (
            <>
              <Constructor />
              <Modal onClose={modalCloseIng}>
                <IngredientDetails bg={background}/>
              </Modal>
            </>
          ) : (
            <IngredientDetails bg={background}/>
          )}
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
