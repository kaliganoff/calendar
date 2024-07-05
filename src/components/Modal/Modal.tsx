import "./Modal.css";

function Modal({
  isOpen,
  text,
  onClose,
}: {
  isOpen: boolean;
  text: string;
  onClose: () => void;
}) {
  if (isOpen)
    return (
      <div className="modal-overlay">
        <div className="modal">
          <p>{text}</p>
          <button type="button" className="modal-button" onClick={onClose}>
            Хорошо
          </button>
        </div>
      </div>
    );

  return null;
}

export default Modal;
