import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import Alert from '../Validaciones/Alerts/Alert.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { baseURL } from '../../api.js';
import Swal from 'sweetalert2';
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";

import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import { auth } from "./firebase.js";

const EstiloDeBoton = {
  border: '1px solid black',
  borderRadius: '10px',
};

const BotonSocial = ({ icono, texto, onClick }) => (
  <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm" style={EstiloDeBoton}>
    <img
      src={icono}
      alt="icono"
      style={{ height: '1.6rem', pointerEvents: 'none' }}
    />
    <button
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        color: 'black',
      }}
      onClick={onClick}
    >
      <span>{texto}</span>
    </button>
  </div>
);

const Login = () => {
  const [dataUser, setDataUser] = useState(null);

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [alert, setAlert] = useState(null);

  const [mostrarDiv, setMostrarDiv] = useState(true);

  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      const data = credentials.user;

      const response = await fetch(`${baseURL}/users/email-oauth/${data.email}`);
      if (response.ok) {
        const { existe, usuario } = await response.json();
        if (existe) {
          // console.log("El usuario existe:", usuario);

          const user = { usuario: usuario.nombre, correo: usuario.correoElectronico, ID_usuario: usuario.ID_usuario, ID_rol: usuario.ID_rol, foto: data.photoURL };
          // console.log("user", user)

          const logData = {
            CorreoElectronico: data.email,
            ProveedorOAuth: 'google.com'
          };

          try {
            // Comentado para evitar el registro de logs
            /*
            const logResponse = await fetch(`${baseURL}/logsInicioSesionOAuth`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(logData)
            });

            if (!logResponse.ok) {
              throw new Error('Error al registrar el inicio de sesión');
            }
            */
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('isLoggedInOAuth', true);
            // console.log("user_set", user)
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
            window.location.href = '/perfil';
          } catch (error) {
            console.error('Error al registrar el inicio de sesión:', error);
          }

        } else {
          // console.log("El usuario no existe")
          const newUserResponse = await fetch(`${baseURL}/users-oauth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: data.displayName, correoElectronico: data.email }),
          });
          if (newUserResponse.ok) {
            const newUser = await newUserResponse.json();
            // console.log("Usuario creado exitosamente:", newUser);

            // Realiza un segundo fetch para obtener la información del usuario recién creado
            const userInfoResponse = await fetch(`${baseURL}/users/email-oauth/${data.email}`);
            if (userInfoResponse.ok) {
              const { existe, usuario } = await userInfoResponse.json();
              // console.log("Información del usuario:", usuario);

              const user = { usuario: usuario.nombre, correo: usuario.correoElectronico, ID_usuario: usuario.ID_usuario, ID_rol: usuario.ID_rol, foto: data.photoURL };
              const logData = {
                CorreoElectronico: data.email,
                ProveedorOAuth: 'google.com'
              };

              try {
                // Comentado para evitar el registro de logs
                /*
                const logResponse = await fetch(`${baseURL}/logsInicioSesionOAuth`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(logData)
                });

                if (!logResponse.ok) {
                  throw new Error('Error al registrar el inicio de sesión');
                }
                */
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('isLoggedInOAuth', true);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.reload();
                window.location.href = '/perfil';
              } catch (error) {
                console.error('Error al registrar el inicio de sesión:', error);
              }
            } else {
              console.error("Error al obtener la información del usuario:", userInfoResponse.status);
            }
          } else {
            console.error("Error al crear el usuario:", newUserResponse.status);
          }
        }
      } else {
        console.error("Error al verificar el correo electrónico:", response.status);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleFacebook = async (event) => {
    const provider = new FacebookAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log("credentials", credentials.user);
      const data = credentials.user;
      console.log("data", data);
      const user = { usuario: data.displayName, correo: data.email, id: data._id, tipo: data.typeUser, foto: data.photoURL };
      console.log("user", user);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      // navigate('/perfil');
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!correo || !password) {
        showAlert('danger', 'Por favor, ingresa todos los campos.');
        return;
      }
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico: correo, contraseña: password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        showAlert('danger', errorData.msg);
        return;
      }

      const userData = await response.json();

      setDataUser(userData);
      setMostrarDiv(!mostrarDiv);

    } catch (error) {
      console.error('Error de red o conexión:', error.message);
      let alertType = 'danger';
      let errorMessage = 'Error de red o conexión. Por favor, verifica tu conexión a Internet.';
      showAlert(alertType, errorMessage);
    }
  };

  // LOGICA COMPONENTE MFA 

  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleMFA = async (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    try {
      const response = await fetch(`${baseURL}/confirmarIdentidad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: '1',
          email: dataUser.correoElectronico
        }),
      });
      await response.json();
      if (!response.ok) {
        setAlert({ type: 'danger', message: 'Error al enviar el código de verificación' });
        console.log('Error al enviar el código de verificación');
        return new Error('Error al enviar el código de verificación');
      } else {
        setAlert({ type: 'success', message: 'Correo enviado con su código' });
        console.log('Correo enviado con su código');
      }

      setShowTokenForm(true);
    } catch (error) {
      console.log(error.msg);
      setAlert({ type: 'danger', message: error.message });
    }
  };

  const handleTokenSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = event.target.elements.token.value;
      const response = await fetch(`${baseURL}/validateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: dataUser.ID_usuario,
          token: token,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      const tokenJWT = data.token;

      const id = dataUser.ID_usuario;
      const loginResponse = await fetch(`${baseURL}/users/${id}`);
      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginResponse.msg);
      }

      const user = { usuario: loginData.nombre, correo, ID_usuario: loginData.ID_usuario, ID_rol: loginData.ID_rol };

      const logData = {
        CorreoElectronico: correo,
        URLSolicitada: window.location.href,
        CodigoEstadoHTTP: loginResponse.status
      };

      try {
        localStorage.setItem('jwtToken', tokenJWT);
        localStorage.setItem('isLoggedInOAuth', false);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
        window.location.href = '/perfil';
      } catch (error) {
        console.error('Error al registrar el inicio de sesión:', error);
      }

    } catch (error) {
      console.log(error);
      setAlert({ type: 'danger', message: error.msg });
    }
  };

  return (
    <div>
      <Header />
      {alert && <Alert type={alert.type} message={alert.message} onClose={closeAlert} />}
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h1 className="mt-3">Iniciar sesión</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {mostrarDiv && (
            <form className="mt-3 d-flex flex-column align-items-center justify-content-center" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <div className="d-flex align-items-center">
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={toggleMostrarContrasena}>
                  {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Iniciar sesión
              </button>
              <div className="mt-3">
                <BotonSocial icono={IconGoogle} texto="Iniciar sesión con Google" onClick={handleGoogle} />
                <BotonSocial icono={IconFacebook} texto="Iniciar sesión con Facebook" onClick={handleFacebook} />
              </div>
            </form>
          )}
        </div>
        {showTokenForm && (
          <form onSubmit={handleTokenSubmit}>
            <input
              type="text"
              name="token"
              placeholder="Ingrese el código de verificación"
              required
            />
            <button type="submit">Enviar código</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
