/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Eliminar = () => {
  return (
    <div className="modal fade" id="basicModal" tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success">
            <h5 className="modal-title text-white">Eliminar Usuario</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form asp-controller="AdmUsuarios" asp-action="BorrarAdmUsuario">
              <div asp-validation-summary="ModelOnly" className="text-danger"></div>
              <div className="mb-3">
                <p>¿Estás seguro de eliminar este usuario?</p>
                <p>Nombre del usuario: @Model.Nombre</p>
                <p>Correo: @Model.Correo</p>
                <input type="hidden" asp-for="IdUsuario" className="form-control" />
                <span asp-validation-for="IdUsuario" className="text-danger"></span>
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
