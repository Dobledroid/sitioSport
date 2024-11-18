/* eslint-disable no-unused-vars */
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
// import IconPassword from "../Login/assets/password-icon.svg";
import { baseURL, fetchData } from '../../api.js';
import Alert from '../Validaciones/Alerts/Alert.js';

const Recuperacion = () => {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Cierra la alerta después de 5 segundos (o ajusta según tu necesidad)
    setTimeout(() => setAlert(null), 5000);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleRecuperacion = async (event) => {
    event.preventDefault();

    try {
      if (!correo) {
        showAlert('danger', 'Por favor, ingresa tu correo electrónico.');
        return;
      }
      const response = await fetchData(`${baseURL}/users/email/${encodeURIComponent(correo)}`);
      const userData = await response.json();
      // console.log("userData", userData);

      if (response.ok) {
        navigate('/validacion', { state: userData });
      } else {
        let alertType = 'danger';
        let errorMessage = '';
        if (response.status === 400) {
          errorMessage = 'Solicitud incorrecta. Por favor proporcione correo electrónico y contraseña';
        }
        else if (response.status === 401) {
          errorMessage = 'Usuario no autorizado. Verifica tus credenciales.';
        } else if (response.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else if (response.status === 500) {
          errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.';
        } else {
          const errorData = await response.json();
          errorMessage = errorData.msg || 'Error desconocido';
        }
        showAlert(alertType, errorMessage);
        return;
      }
    } catch (error) {
      showAlert('danger', 'Error al procesar la solicitud. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container">

        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="card mb-3">

                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Recuperar Contraseña</h5>
                      <p className="text-center small">Ingrese su correo electrónico para continuar</p>
                    </div>

                    <form onSubmit={handleRecuperacion} className="row g-3 needs-validation" >

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Correo electrónico:</label>
                        <div className="input-group has-validation">

                          <input type="email"
                            name="email"
                            required
                            className="form-control"
                            placeholder="Ingrese tu correo electrónico"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)} />
                          <div className="invalid-feedback">Por favor, ingrese su correo electrónico.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">Acceso</button>
                      </div>
                      {alert && alert.type === 'danger' && (
                        <Alert type="danger" message={alert.message} onClose={closeAlert} />
                      )}
                      <div className="col-12">
                        <p className="small mb-0">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                      </div>

                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Recuperacion;