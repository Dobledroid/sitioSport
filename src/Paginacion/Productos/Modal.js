import React from "react";
import PropTypes from 'prop-types'; // Importación de PropTypes

const Modal = ({ isOpen, closeModal }) => {
  return (
    <>
      {/* Cambié `tabindex` por `tabIndex` */}
      <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close" 
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal" 
                onClick={closeModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Definición de las prop types
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,  // `isOpen` debe ser booleano y es requerido
  closeModal: PropTypes.func.isRequired,  // `closeModal` debe ser una función y es requerido
};

export default Modal;
