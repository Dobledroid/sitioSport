  /* eslint-disable no-unused-vars */
  import React, { useState, useEffect, useRef } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  import Header from '../../Esquema/Header';
  import Footer from '../../Esquema/Footer';
  import Alert from '../Validaciones/Alerts/Alert';
  import { baseURL } from '../../api.js';
  
  const MFA = () => {
    const [alert, setAlert] = useState(null);
    const [showTokenForm, setShowTokenForm] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const navigate = useNavigate();
    const [isLoggedUserTemp, setIsLoggedUserTemp] = useState(null);
  
    const isFirstRenderRef = useRef(true);
  
    // useEffect(() => {
    //   const getLoggedUserTempFromLocalStorage = () => {
    //     const LoggedInTemp = localStorage.getItem('isLoggedInTemp');
    //     if (LoggedInTemp) {
    //       const tempUser = localStorage.getItem('isLoggedUserTemp');
    //       if (tempUser) {
    //         setIsLoggedUserTemp(tempUser);
    //         localStorage.removeItem('isLoggedInTemp');
    //         localStorage.removeItem('isLoggedUserTemp');
    //       }
    //     }else{
    //       navigate('/login');
    //     }
    //   };
  
    //   getLoggedUserTempFromLocalStorage();
    // }, [navigate]);
  
    useEffect(() => {
      if (isFirstRenderRef.current) {
        console.log('El componente se ha renderizado.');
        const LoggedInTemp = localStorage.getItem('isLoggedInTemp');
        if (LoggedInTemp) {
          console.log('isLoggedInTemp');
          const tempUser = localStorage.getItem('isLoggedUserTemp');
          if (tempUser) {
            setIsLoggedUserTemp(tempUser);
            console.log('Cambio de estado');
            // localStorage.removeItem('isLoggedInTemp');
            // localStorage.removeItem('isLoggedUserTemp');
          }
          isFirstRenderRef.current = false;
  
        }
      }
    }, []);
  
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
            method: '1', // Autenticación por correo electrónico
            email: isLoggedUserTemp.correoElectronico
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          setAlert({ type: 'danger', message: 'Error al enviar el código de verificación' });
          return new Error('Error al enviar el código de verificación');
        } else {
          setAlert({ type: 'success', message: 'Correo enviado con su código' });
        }
  
        setShowTokenForm(true);
      } catch (error) {
        console.log(error.msg)
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
            id: isLoggedUserTemp.ID_usuario,
            token: token,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.msg);
        }
  
        const id = isLoggedUserTemp.ID_usuario;
        const loginResponse = await fetch(`${baseURL}/users/${id}`);
  
        const loginData = await loginResponse.json();
  
        if (!loginResponse.ok) {
          throw new Error(loginResponse.msg);
        }
        const user = { usuario: loginData.nombre, correo: loginData.correoElectronico, ID_usuario: loginData.ID_usuario, tipo: loginData.ID_rol };
  
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/perfil', { state: user })
  
      } catch (error) {
        console.log(error)
        setAlert({ type: 'danger', message: error.msg });
      }
    };
  
    const handleResendCode = () => {
      setElapsedTime(0);
      handleMFA();
    };
  
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    //   }, 1000);
    //   return () => clearInterval(interval);
    // }, []);
  
    // useEffect(() => {
    //   if (elapsedTime > 30) {
    //     setShowResendButton(true);
    //   }
    // }, [elapsedTime]);
  
    const closeAlert = () => {
      setAlert(null);
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
                        <h5 className="card-title text-center pb-0 fs-4">Verifica tu identidad</h5>
                        <p className="text-center small"></p>
                      </div>
                      {!showTokenForm ? (
                        <form onSubmit={handleMFA} className="row g-3 needs-validation">
                          <div className="col-12">
                            {/* <p classNameName='my-3'>Envíe un código de verificación a {isLoggedUserTemp.correoElectronico}</p> */}
                            <button className="btn btn-primary w-100" type="submit">Enviar código</button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleTokenSubmit} className="row g-3 needs-validation">
                          <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">Método de autentificación:</label>
                            <div className="input-group has-validation">
                              <input type="number" name="token" className="form-control" placeholder="Ingrese el código" />
                            </div>
                          </div>
                          <p className='my-3'>Envíe un código de verificación a {isLoggedUserTemp.correoElectronico}</p>
                          <div className="col-12">
                            <button className="btn btn-primary w-100" type="submit">Enviar código</button>
                          </div>
                          {showResendButton && (
                            <button
                              type="button"
                              className="btn btn-secondary text-white w-100 mt-3 mb-3 fw-semibold shadow-sm"
                              onClick={handleResendCode}
                            >
                              Reenviar código
                            </button>
                          )}
                        </form>
                      )}
                      {alert && alert.type === 'success' && (
                        <Alert type="success" message={alert.message} onClose={closeAlert} />
                      )}
                      {alert && alert.type === 'danger' && (
                        <Alert type="danger" message={alert.message} onClose={closeAlert} />
                      )}
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
  
  export default MFA;
  