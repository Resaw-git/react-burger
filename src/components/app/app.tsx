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
import {closeModal, closeModalOrd} from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ProtectedRoute} from "../protected-route/protected-route";
import {fetchIngredients} from "../../services/actions/ingredients";
import {ILocation} from "../../utils/types";
import {FeedDetails} from "../feed-details/feed-details";
import {Orders} from "../../pages/orders";

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const { modalOpen } = useSelectorHook((store) => store.modal);
  const dispatch = useDispatchHook();

  const modalClose = () => {
    closeModal(dispatch)
    history.goBack();
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
        <Route path="/feed/:id" exact={true}>
          {background ? (
              <>
                <Feed />
                <Modal onClose={modalClose}>
                  <FeedDetails bg={background} />
                </Modal>
              </>
          ) : (
              <FeedDetails bg={background} />
          )}
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
              <Modal onClose={modalClose}>
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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
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
