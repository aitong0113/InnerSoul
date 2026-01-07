// src/component/Modal.jsx

import { useRef, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';

function CustomModal({ title = '提示', children, isOpen, onClose }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    modalInstance.current = new Modal(modalRef.current);

    return () => {
      modalInstance.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!modalInstance.current) return;

    isOpen
      ? modalInstance.current.show()
      : modalInstance.current.hide();
  }, [isOpen]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            {children}
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              關閉
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CustomModal;