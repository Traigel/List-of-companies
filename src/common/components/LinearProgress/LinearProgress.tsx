import React from "react";
import styles from "./LinearProgress.module.scss"

export const LinearProgress = () => {
  return <div className={styles.linearProgressBox}>
    <progress className={styles.linearProgress}/>
  </div>
}