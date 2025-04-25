import React, { PropsWithChildren } from "react";

import styles from "./Modal.module.css";

import Button from "../Button/Button";

interface ModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

const Modal = function Modal({
  ref,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <dialog ref={ref} className={styles.modal}>
      <div className={styles["modal-content"]}>
        <Button
          onClick={onClose}
          className={styles["close-btn"]}
          type="button"
          styleType="primary"
          name="Close"
        />
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
