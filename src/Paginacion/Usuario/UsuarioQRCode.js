import React from 'react';
import PropTypes from 'prop-types';  // Importar PropTypes
import QRCode from 'react-qr-code';

const UsuarioQRCode = ({ userData }) => {
  // Convertir los datos del usuario en una cadena JSON
  const userDataJSON = JSON.stringify(userData);

  return (
    <div>
      {/* Renderizar el código QR con los datos del usuario */}
      <QRCode value={userDataJSON} />
      {/* Mostrar los datos del usuario debajo del código QR */}
      {/* <pre>{userDataJSON}</pre> */}
    </div>
  );
};

// Validación de los props usando PropTypes
UsuarioQRCode.propTypes = {
  userData: PropTypes.object.isRequired,  // Asegura que userData sea un objeto y es requerido
};

export default UsuarioQRCode;
