import React, {FC} from "react";
import styles from "./loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.inner + " " + styles.one} />
      <div className={styles.inner + " " + styles.two} />
      <div className={styles.inner + " " + styles.three} />
    </div>
  );
};

export default Loader;
