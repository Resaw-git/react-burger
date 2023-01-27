import React, { useEffect, FC} from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Header from "../header/header";
import { Constructor, Login, Register, ForgotPassword, ResetPassword, NotFound404, Profile, Feed } from "../../pages";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {closeMobile, closeModal, closeModalOrd} from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { fetchIngredients } from "../../services/actions/ingredients";
import { ILocation } from "../../utils/types";
import { FeedDetails } from "../feed-details/feed-details";
import { Orders } from "../../pages/orders";
import MobileMenu from "../mobile-menu/mobile-menu";

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const { modalOpen, mobileMenu } = useSelectorHook((store) => store.modal);
  const dispatch = useDispatchHook();


  const modalClose = () => {
    closeModal(dispatch);
    history.goBack();
  };

  const modalCloseOrd = () => {
    closeModalOrd(dispatch);
  };

  const mobileClose = () => {
    closeMobile(dispatch)
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Header />
      {mobileMenu &&
          (<MobileMenu onClose={mobileClose}/>)
      }
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
                <FeedDetails bg={background} path={location.pathname} />
              </Modal>
            </>
          ) : (
            <FeedDetails bg={background} path={location.pathname} />
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
          {background ? (
            <>
              <Orders />
              <Modal onClose={modalClose}>
                <FeedDetails bg={background} path={location.pathname} />
              </Modal>
            </>
          ) : (
            <FeedDetails bg={background} path={location.pathname} />
          )}
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
