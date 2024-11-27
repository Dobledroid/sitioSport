import React from 'react'; // Importa React
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes para validar props

const ProtectedRoute = ({ canActivate, redirectPath = '/' }) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

// Validación de props
ProtectedRoute.propTypes = {
  canActivate: PropTypes.bool.isRequired, // `canActivate` es obligatorio y debe ser un booleano
  redirectPath: PropTypes.string,        // `redirectPath` es opcional y debe ser un string
};

export default ProtectedRoute;
