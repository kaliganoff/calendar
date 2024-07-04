import React, { Children } from "react";
import "./Modal.css";

function Modal({ isOpen, text, onClose }) {
  return (
    <>
      {isOpen && (
        <>
          <div className="modal-overlay" />
          <div className="modal">
            <p>{text}</p>
            <button className="modal-button" onClick={onClose}>
              Хорошо
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
