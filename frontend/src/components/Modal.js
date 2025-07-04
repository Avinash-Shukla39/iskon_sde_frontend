// src/components/Modal.js
import "../App.css";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm">Yes</button>
                    <button onClick={onClose} className="cancel">No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
