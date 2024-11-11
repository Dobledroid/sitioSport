  /* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import Sidebar from "../../Esquema/Sidebar.js";
import { Bar } from 'react-chartjs-2';
import { baseURL } from '../../api.js';

import './Respuesta.css';

const Respuestas = () => {
  const [respuestasMovil, setRespuestasMovil] = useState([]);
  const [respuestasWeb, setRespuestasWeb] = useState([]);
  const [cargandoMovil, setCargandoMovil] = useState(true);
  const [cargandoWeb, setCargandoWeb] = useState(true);
  const [fechaInicio, setFechaInicio] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);

  // Función para obtener respuestas de la app móvil
  const fetchRespuestasMovil = useCallback(async () => {
    setCargandoMovil(true);
    try {
      const response = await fetch(`${baseURL}/respuestas-por-fecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      if (!response.ok) {
        throw new Error('Error al obtener las respuestas de la app móvil');
      }
      const data = await response.json();
      setRespuestasMovil(data);
      setCargandoMovil(false);
    } catch (error) {
      console.error(error);
    }
  }, [fechaInicio, fechaFin]);

  // Función para obtener respuestas de la web
  const fetchRespuestasWeb = useCallback(async () => {
    setCargandoWeb(true);
    try {
      const response = await fetch(`${baseURL}/respuestas-por-fecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      if (!response.ok) {
        throw new Error('Error al obtener las respuestas de la web');
      }
      const data = await response.json();
      setRespuestasWeb(data);
      setCargandoWeb(false);
    } catch (error) {
      console.error(error);
    }
  }, [fechaInicio, fechaFin]);
  
  useEffect(() => {
    fetchRespuestasMovil();
    fetchRespuestasWeb();
  }, [fechaInicio, fechaFin, fetchRespuestasMovil, fetchRespuestasWeb]);

  const countResponses = (responses, option) => responses.filter(resp => resp.Respuesta === option).length;

  // Datos para la gráfica de la app móvil
  const dataMovil = {
    labels: ['No me gustó', 'Neutral', 'Me encantó'],
    datasets: [
      {
        label: 'Cantidad de respuestas (App Móvil)',
        data: [
          countResponses(respuestasMovil, 'No me gustó'),
          countResponses(respuestasMovil, 'Neutral'),
          countResponses(respuestasMovil, 'Me encantó')
        ],
        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb'],
      },
    ],
  };

  // Datos para la gráfica de la web
  const dataWeb = {
    labels: ['No me gustó', 'Neutral', 'Me encantó'],
    datasets: [
      {
        label: 'Cantidad de respuestas (Web)',
        data: [
          countResponses(respuestasWeb, 'No me gustó'),
          countResponses(respuestasWeb, 'Neutral'),
          countResponses(respuestasWeb, 'Me encantó')
        ],
        backgroundColor: ['#4bc0c0', '#ff9f40', '#9966ff'],
      },
    ],
  };

  // Generación del reporte de satisfacción
  const generateReport = (responses, platform) => {
    const totalResponses = responses.length;
    const noMeGusto = countResponses(responses, 'No me gustó');
    const neutral = countResponses(responses, 'Neutral');
    const meEncanto = countResponses(responses, 'Me encantó');

    if (noMeGusto > neutral && noMeGusto > meEncanto) {
      return `En la plataforma ${platform}, la mayoría de los usuarios no están satisfechos entre ${fechaInicio} y ${fechaFin}. Se sugiere mejorar este proceso.`;
    } else if (neutral > noMeGusto && neutral > meEncanto) {
      return `En la plataforma ${platform}, el nivel de satisfacción es mayormente neutral entre ${fechaInicio} y ${fechaFin}. Existe margen para mejorar.`;
    } else if (meEncanto > noMeGusto && meEncanto > neutral) {
      return `En la plataforma ${platform}, la mayoría de los usuarios están satisfechos entre ${fechaInicio} y ${fechaFin}. Esto indica una experiencia positiva.`;
    } else {
      return `La distribución de respuestas en la plataforma ${platform} es equilibrada entre ${fechaInicio} y ${fechaFin}. Analizar más detalles para identificar mejoras.`;
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
            <button onClick={() => { fetchRespuestasMovil(); fetchRespuestasWeb(); }} className="btn btn-primary ms-3">Actualizar</button>
          </div>
          {cargandoMovil || cargandoWeb ? (
            <div>Cargando respuestas...</div>
          ) : (
            <div className="row">
              {/* Gráfica para App Móvil */}
              <div className="col-md-6">
                <h6>Respuestas App Móvil</h6>
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                  <Bar data={dataMovil} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="report-text mt-4">
                  <h6>Reporte de Nivel de Satisfacción (App Móvil)</h6>
                  <p>{generateReport(respuestasMovil, 'App Móvil')}</p>
                </div>
              </div>

              {/* Gráfica para Web */}
              <div className="col-md-6">
                <h6>Respuestas Web</h6>
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                  <Bar data={dataWeb} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="report-text mt-4">
                  <h6>Reporte de Nivel de Satisfacción (Web)</h6>
                  <p>{generateReport(respuestasWeb, 'Web')}</p>
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
