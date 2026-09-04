import React, {FC} from "react";
import styles from "./modal-overlay.module.css";

interface IComponentProps {
  onClose: () => void
}

const ModalOverlay: FC<IComponentProps> = ({ onClose }) => {
  return <div onClick={onClose} className={styles.modaloverlay}></div>;
};

export default ModalOverlay;

