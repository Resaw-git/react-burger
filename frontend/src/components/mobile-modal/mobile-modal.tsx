import React, {FC, useEffect} from 'react';
import ReactDOM from "react-dom";
import styles from "./mobile-modal.module.css";
import {CloseIcon} from "../shared";

interface IComponentProps {
    children: React.ReactNode
    onClose: () => void;
}

const MobileModal: FC<IComponentProps> = ({ onClose, children }) => {


    const escapeModal = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escapeModal);
        return () => {
            document.removeEventListener("keydown", escapeModal);
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <div className={styles.cross}>
                <CloseIcon type="primary" onClick={onClose} />
            </div>
            {children}
        </div>,
        document.getElementById("mobile-modal") as HTMLElement
    );
};

export default MobileModal;