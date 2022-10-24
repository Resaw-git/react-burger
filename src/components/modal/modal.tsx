import React, {FC, useEffect} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";
import {ILocation} from "../../utils/types";
import {useDispatchHook, useSelectorHook} from "../../hooks/redux";
import {closeModal} from "../../services/actions/modal";


interface IComponentProps {
  children: React.ReactNode
  onClose: () => void
}

const Modal: FC<IComponentProps> = ({ children, onClose }) => {
  const { isDetails } = useSelectorHook((store) => store.modal)
  const dispatch = useDispatchHook();
  const location = useLocation<ILocation>();

  const escapeModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    if ((location.pathname === '/' && isDetails) ||
        (location.pathname === '/feed' && isDetails)) {
      closeModal(dispatch)
    }
  }, [location])

  useEffect(() => {
    document.addEventListener("keydown", escapeModal);
    return () => {
      document.removeEventListener("keydown", escapeModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.cross} data-test={"cross"}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("react-modal") as HTMLElement
  );
};

export default Modal;
