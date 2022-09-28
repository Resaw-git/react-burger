import React, {useEffect, FC} from "react";
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
  Feed,
} from "../../pages";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {closeModalIng, closeModalOrd} from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ProtectedRoute} from "../protected-route/protected-route";
import {fetchIngredients} from "../../services/actions/ingredients";
import {ILocation} from "../../utils/types";

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const { modalOpen } = useSelectorHook((store) => store.modal);
  const dispatch = useDispatchHook();

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
        <Route path="/feed" exact={true}>
          <Feed />
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
                <IngredientDetails bg={background} />
              </Modal>
            </>
          ) : (
            <IngredientDetails bg={background} />
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
