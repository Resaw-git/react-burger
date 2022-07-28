import React, {useEffect} from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
} from "../../pages";
import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {closeModalIng, closeModalOrd} from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ProtectedRoute} from "../protected-route/protected-route";
import {fetchIngredients} from "../../services/actions/ingredients";

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

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
