import React, { useState, useEffect, useCallback} from 'react';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import Sidebar from "../../Esquema/Sidebar.js";
import { Bar } from 'react-chartjs-2';
import { baseURL } from '../../api.js';

import './Respuesta.css';

const Respuestas = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaInicio, setFechaInicio] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);

  const fetchRespuestas = useCallback(async () => {
    setCargando(true);
    try {
      const response = await fetch(`${baseURL}/respuestas-por-fecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      if (!response.ok) {
        throw new Error('Error al obtener las respuestas');
      }
      const data = await response.json();
      setRespuestas(data);
      setCargando(false);
    } catch (error) {
      console.error(error);
    }
  }, [fechaInicio, fechaFin]);
  
  useEffect(() => {
    fetchRespuestas();
  }, [fechaInicio, fechaFin,fetchRespuestas]);

  const countResponses = (option) => respuestas.filter(resp => resp.Respuesta === option).length;

  // Datos para la gráfica
  const data = {
    labels: ['No me gustó', 'Neutral', 'Me encantó'],
    datasets: [
      {
        label: 'Cantidad de respuestas',
        data: [
          countResponses('No me gustó'),
          countResponses('Neutral'),
          countResponses('Me encantó')
        ],
        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb'],
      },
    ],
  };

  // Generación del texto de reporte
  const generateReport = () => {
    // eslint-disable-next-line no-unused-vars
    const totalResponses = respuestas.length;
    const noMeGusto = countResponses('No me gustó');
    const neutral = countResponses('Neutral');
    const meEncanto = countResponses('Me encantó');

    if (noMeGusto > neutral && noMeGusto > meEncanto) {
      return `El resultado obtenido del nivel de satisfacción del usuario en el módulo de compra de productos entre ${fechaInicio} y ${fechaFin} indica que la mayoría de los usuarios no están satisfechos. Esto sugiere que este proceso presenta problemas que deben ser mejorados de forma prioritaria.`;
    } else if (neutral > noMeGusto && neutral > meEncanto) {
      return `Entre las fechas ${fechaInicio} y ${fechaFin}, el nivel de satisfacción en el módulo de compra es mayormente neutral. Esto indica que los usuarios están relativamente satisfechos, pero existe margen para optimizar y mejorar la experiencia.`;
    } else if (meEncanto > noMeGusto && meEncanto > neutral) {
      return `En el periodo entre ${fechaInicio} y ${fechaFin}, el nivel de satisfacción del usuario en el módulo de compra es mayormente positivo. Esto sugiere que el proceso cumple adecuadamente con las expectativas de los usuarios.`;
    } else {
      return `La distribución de respuestas entre las fechas ${fechaInicio} y ${fechaFin} es equilibrada. Se recomienda analizar con más detalle las áreas específicas para identificar posibles mejoras.`;
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="container my-4 custom-height">
          <h5 className="mb-3">Gráfico y Reporte de Respuestas de la Encuesta</h5>
          <div className="mb-4">
            <label>Fecha Inicio:</label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            <label className="ms-3">Fecha Fin:</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            <button onClick={fetchRespuestas} className="btn btn-primary ms-3">Actualizar</button>
          </div>
          {cargando ? (
            <div>Cargando respuestas...</div>
          ) : (
            <div className="row">
              {/* Columna izquierda: Gráfica */}
              <div className="col-md-6">
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                  <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              {/* Columna derecha: Reporte textual */}
              <div className="col-md-6">
                <div className="report-text">
                  <h6>Reporte de Nivel de Satisfacción</h6>
                  <p>{generateReport()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Respuestas;
