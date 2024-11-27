import React, { useState } from 'react';


const Eliminar = () => {
  // Simulación de datos del usuario para demostración
  const [usuario ] = useState({
    nombre: "Nombre de Ejemplo",
    correo: "correo@ejemplo.com",
    idUsuario: 123,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar la eliminación del usuario
    console.log(`El usuario con ID ${usuario.idUsuario} ha sido eliminado.`);
  };

  return (
    <div className="modal fade" id="basicModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success">
            <h5 className="modal-title text-white">Eliminar Usuario</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="text-danger">
                {/* Aquí se pueden mostrar errores de validación si es necesario */}
              </div>
              <div className="mb-3">
                <p>¿Estás seguro de eliminar este usuario?</p>
                <p>Nombre del usuario: {usuario.nombre}</p>
                <p>Correo: {usuario.correo}</p>
                <input type="hidden" value={usuario.idUsuario} className="form-control" />
              </div>

              <div className="modal-footer pb-1">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-primary">Eliminar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eliminar;
