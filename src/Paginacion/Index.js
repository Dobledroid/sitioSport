/* eslint-disable no-unused-vars */
import React from 'react';
// import { Link } from "react-router-dom";
// import Carousel from 'react-bootstrap/Carousel';
import Header from '../Esquema/Header';
import Footer from '../Esquema/Footer';
import './Index.css'

const Index = () => {
  return (
    <>
      <Header />
      <section className='hero mt-1'>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/Carrusel/1.jpg" className="d-block w-100" alt="..." />

            </div>
            <div className="carousel-item">
              <img src="/images/Carrusel/2.jpg" className="d-block w-100" alt="..." />

            </div>
            <div className="carousel-item">
              <img src="/images/Carrusel/1.jpg" className="d-block w-100" alt="..." />

            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      {/* <div classNameName='container'>
        <div>
          <div id="accessibility-buttons">
            <Link to="/menuVisual" classNameName="btn btn-info"
              data-bs-toggle="tooltip" data-bs-placement="right"
              title="Accesibilidad para personas con discapacidad visual">
              <i classNameName="icon-blind"></i>
            </Link>

            <Link to="/indexH" classNameName="btn btn-danger ml-2"
              data-bs-toggle="tooltip" data-bs-placement="right"
              title="Accesibilidad de carga rápida">
              <i classNameName="icon-file-text"></i>
            </Link>
          </div>
        </div>
      </div> */}

      <section className="from-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title from-blog__title">
                <h2>Desde el blog</h2>

                <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="images/blog/como_perder_grasa_ganar_musculo.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li><i className="fa fa-calendar-o"></i> Enero 7,2021</li>
                    <li><i className="fa fa-comment-o"></i> 5</li>
                  </ul>
                  <h5><a href="https://www.revistagq.com/cuidados/articulo/ejercicios-perder-grasa-ganar-musculo">Ejercicios para perder grasa y ganar musculo</a></h5>
                  <p>Cómo entrenar para perder grasa y ganar músculo a la vez es la gran pregunta que se hacen todos los que se apuntan al gimnasio por primera vez.
                    Si tu objetivo es perder barriga y ponerte cachas al mismo tiempo no tienes un sueño imposible: solo tienes que seguir nuestros consejos.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="images/blog/61672ad7b8e33706707e0809_Captura de Pantalla 2021-10-13 a la(s) 14.54.51.png" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li><i className="fa fa-calendar-o"></i> Junio 27,2022</li>
                    <li><i className="fa fa-comment-o"></i> 5</li>
                  </ul>
                  <h5><a href="https://www.siclo.com/blog/los-6-mejores-ejercicios-funcionales-para-ganar-fuerza-agilidad-y-resistencia">6 ejercicios funcionales para ganar resistencia, agilidad y fuerza</a></h5>
                  <p>Te traemos una lista con los 6 mejores ejercicios funcionales que puedes realizar en casa, en el parque, en el gimnasio o dónde quieras.
                    Si quieres ganar fuerza, resistencia,agilidad y tener una progresión notable, ¡toma nota!.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="images/blog/rutinas-de-entrenamiento.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li><i className="fa fa-calendar-o"></i> Octubre 29,2018</li>
                    <li><i className="fa fa-comment-o"></i> 5</li>
                  </ul>
                  <h5><a href="https://recuperat-ion.com.es/blog/rutinas-de-entrenamiento/">Rutinas de entrenamiento según tu objetivo</a></h5>
                  <p>Es muy común escuchar qué hacer deporte ayuda a mejorar la salud tanto física como mental y a reducir peso. Para ser constantes es importante contar con rutinas de entrenamiento a las que seguir.
                    Esto no puede ser más cierto, hacer ejercicio físico ayuda a quemar grasa, tonificar músculos y lograr mayor resistencia.
                    Las rutinas de entrenamiento varían segun el objetivo que tengas. Número de repeticiones, peso en cada repetición, cardio, tiempo entre cada repetición, días de entreno.  ¿Qué es lo que tú quieres conseguir?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Index;
