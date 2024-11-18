/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { baseURL } from '../../api.js';

const AgregarDireccionesEnvio = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState("México");

  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("Huejutla de reyes");
  const [colonia, setColonia] = useState("");
  const [estado, setEstado] = useState("Hidalgo");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [referencias, setReferencias] = useState("");
  const [predeterminado] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${baseURL}/direccion-envio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ID_usuario: user.ID_usuario,
          nombre,
          apellidos,
          pais,
          direccion,
          ciudad,
          colonia,
          estado,
          codigoPostal,
          telefono,
          referencias,
          predeterminado
        })
      });

      if (response.ok) {
        alert("Dirección de envío guardada exitosamente.");
        // AGREGAR VALID,ACIÓN DEL PATH 
        handleRegresar();
      } else {
        alert("Error al guardar la dirección de envío.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la dirección de envío. Por favor, intenta nuevamente.");
    }
  };

  const handleRegresar = () => {
    if (location.state && location.state.pathEnvio) {
      const { pathEnvio, subtotal, descuentoAplicado, total } = location.state;

      if (pathEnvio === '/seleccionar-direccion-envio') {
        console.log(subtotal);
        navigate('/checkout', {
          state: {
            subtotal,
            descuentoAplicado,
            total
          }
        });
      } else {
        navigate('/mis-direcciones');
      }
    } else {
      navigate('/mis-direcciones');
    }
  };


  return (
    <>
      <Header />
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>Detalles de envio</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Nombre<span>*</span></p>
                        <input className="text-dark" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Apellidos<span>*</span></p>
                        <input className="text-dark" type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>País<span>*</span></p>
                    <input className="text-dark" type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
                  </div>
                  <div className="checkout__input">
                    <p>Código postal<span>*</span></p>
                    <input className="text-dark" type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
                    {/* <button type="button" onClick={validarCodigoPostal} className="site-btn mt-3">Validar Código Postal</button> */}
                  </div>
                  <div className="checkout__input">
                    <p>Estado<span>*</span></p>
                    <input className="text-dark" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                  </div>
                  <div className="checkout__input">
                    <p>Ciudad<span>*</span></p>
                    <input className="text-dark checkout__input__add" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                  </div>
                  {/* <div class="checkout__input">
                    <p>Ciudad<span>*</span></p>
                    {localidades.length > 0 ? (
                      <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                        {localidades.map((localidad, index) => (
                          <option key={index} value={localidad}>{localidad}</option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" value={colonia} onChange={(e) => setColonia(e.target.value)} required />
                    )}
                  </div> */}
                  <div className="checkout__input">
                    <p>Colonia<span>*</span></p>
                    <input className="text-dark checkout__input__add" type="text" value={colonia} onChange={(e) => setColonia(e.target.value)} required />
                  </div>
                  <div className="checkout__input">
                    <p>Dirección<span>*</span></p>
                    <input className="text-dark checkout__input__add" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                  </div>
                  <div className="checkout__input">
                    <p>Teléfono<span>*</span></p>
                    <input className="text-dark checkout__input__add" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                  </div>
                  <div className="checkout__input">
                    <p>Pedidos<span>*</span></p>
                    <input className="text-dark" type="text"
                      placeholder="Notas sobre su pedido, por ejemplo, notas especiales de entrega."
                      value={referencias} onChange={(e) => setReferencias(e.target.value)} required />
                  </div>
                  <button type="submit" className="site-btn">Guardar dirreción de envio</button>
                  <button onClick={() => handleRegresar()} className="site-btn ms-5">Regresar</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AgregarDireccionesEnvio;
