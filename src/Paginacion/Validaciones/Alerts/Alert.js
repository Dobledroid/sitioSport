import React from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ type, message, onClose }) => {
  return (
    <BootstrapAlert variant={type} onClose={onClose} dismissible>
      {message}
    </BootstrapAlert>
  );
};

// Validación de los props usando PropTypes
Alert.propTypes = {
  type: PropTypes.string.isRequired,     // Asegura que type sea una cadena y es obligatorio
  message: PropTypes.string.isRequired,  // Asegura que message sea una cadena y es obligatorio
  onClose: PropTypes.func.isRequired,    // Asegura que onClose sea una función y es obligatorio
};

export default Alert;
