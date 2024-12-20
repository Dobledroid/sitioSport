import React from 'react';
import PropTypes from 'prop-types';  // Importa PropTypes
import { Modal, Button } from 'react-bootstrap';
import './SurveyModal.css';
import { baseURL } from '../../api.js';

const SurveyModal = ({ show, handleClose, ID_usuario, ID_pedido }) => {

  // Función para manejar la selección de emoji
  const handleEmojiSelect = async (selection) => {
    console.log('Emoji seleccionado:', selection);
    console.log('ID_usuario:', ID_usuario);
    console.log('ID_pedido:', ID_pedido);

    const respuesta = {
      ID_usuario: ID_usuario,
      Respuesta: selection,
      FechaRespuesta: new Date().toISOString(), // Fecha actual
    };

    try {
      const apiUrl = `${baseURL}/respuestasWeb`; // Asegúrate de tener la URL en el archivo .env
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(respuesta),
      });

      if (response.ok) {
        console.log('Respuesta guardada correctamente en la base de datos');
      } else {
        // Lee el error como texto para evitar problemas si no es JSON
        const errorText = await response.text();
        console.error('Error al guardar la respuesta:', errorText);
      }
    } catch (error) {
      console.error('Error al guardar la respuesta:', error);
    } finally {
      // Redirige o realiza cualquier acción de limpieza
      handleRedirect();
    }
  };

  // Función para redirigir y cerrar modal
  const handleRedirect = () => {
    handleClose(); // Cierra el modal
    window.location.href = `/tienda`; // Redirige al detalle del pedido
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Encuesta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¡Muchas gracias por haber realizado tu compra!</p>
        <p>¿Cómo fue tu experiencia?</p>
        <div className="emoji-container">
          <span
            role="img"
            aria-label="bad"
            className="emoji"
            onClick={() => handleEmojiSelect('No me gustó')}
          >
            😞
          </span>
          <span
            role="img"
            aria-label="neutral"
            className="emoji"
            onClick={() => handleEmojiSelect('Neutral')}
          >
            😐
          </span>
          <span
            role="img"
            aria-label="good"
            className="emoji"
            onClick={() => handleEmojiSelect('Me encantó')}
          >
            😊
          </span>
        </div>
        <Button variant="primary" onClick={handleRedirect} className="mt-3">
          Cerrar        
        </Button>
      </Modal.Body>
    </Modal>
  );
};

// Validación de los props usando PropTypes
SurveyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ID_usuario: PropTypes.string.isRequired,
  ID_pedido: PropTypes.string.isRequired,
};

export default SurveyModal;
