import React from 'react';
import './modal.css'; 

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    type: 'success' | 'error';
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose, type }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal ${type}`}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
