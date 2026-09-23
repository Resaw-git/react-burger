import React, { useEffect, FC} from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/header";
import { Constructor, Login, Register, ForgotPassword, ResetPassword, NotFound404, Profile, Feed } from "../../pages";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {closeMobileMenu, closeModal, closeModalOrd} from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { fetchIngredients } from "../../services/actions/ingredients";
import { ILocationState } from "../../utils/types";
import { FeedDetails } from "../feed-details/feed-details";
import { Orders } from "../../pages/orders";
import MobileMenu from "../mobile-menu/mobile-menu";
import MobileModal from "../modal/mobile-modal";
import { useIsMobile } from "../../hooks/use-media-query";
import MobileOrderDetails from "../order-details/mobile-order-details";

const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = (location.state as ILocationState | null)?.background;
  const { modalOpen, mobileMenu } = useSelectorHook((store) => store.modal);
  const dispatch = useDispatchHook();
  const isMobile = useIsMobile();


  const modalClose = () => {
    closeModal(dispatch);
    navigate(-1);
  };

  const modalCloseOrd = () => {
    closeModalOrd(dispatch);
  };

  const mobileClose = () => {
    closeMobileMenu(dispatch)
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
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <>
              <Constructor />
              {modalOpen && (
                isMobile ? (
                  <MobileModal onClose={modalCloseOrd} title="Заказ оформлен">
                    <MobileOrderDetails />
                  </MobileModal>
                ) : (
                  <Modal onClose={modalCloseOrd}>
                    <OrderDetails />
                  </Modal>
                )
              )}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<FeedDetails path={location.pathname} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRoute>
              <FeedDetails path={location.pathname} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <>
                <Feed />
                {isMobile ? (
                  <MobileModal onClose={modalClose} title="Детали заказа">
                    <FeedDetails bg={true} path={location.pathname} />
                  </MobileModal>
                ) : (
                  <Modal onClose={modalClose}>
                    <FeedDetails bg={true} path={location.pathname} />
                  </Modal>
                )}
              </>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <>
                <Constructor />
                {isMobile ? (
                  <MobileModal onClose={modalClose}>
                    <IngredientDetails bg={true} />
                  </MobileModal>
                ) : (
                  <Modal onClose={modalClose}>
                    <IngredientDetails bg={true} />
                  </Modal>
                )}
              </>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <>
                <Orders />
                {isMobile ? (
                  <MobileModal onClose={modalClose} title="Детали заказа">
                    <FeedDetails bg={true} path={location.pathname} />
                  </MobileModal>
                ) : (
                  <Modal onClose={modalClose}>
                    <FeedDetails bg={true} path={location.pathname} />
                  </Modal>
                )}
              </>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
