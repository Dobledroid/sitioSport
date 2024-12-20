import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";  // Importa PropTypes
import Slider from "react-slick";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./CustomPaging.css";
import { baseURL } from '../api.js';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

// Agrega las validaciones de PropTypes
SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

function CustomPaging({ productId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${baseURL}/products-with-imagens/1`);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error('Error al cargar las imágenes del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchImages();
  }, [productId]);

  const settings = {
    customPaging: function (i) {
      return (
        <button className="thumbnail-button">
          <img
            src={images[i]?.imagenUrl || ''}
            alt={`Thumbnail ${i + 1}`}
            className="thumbnail-image"
          />
        </button>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-image-container">
            <img
              src={image.imagenUrl}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Agrega la validación de PropTypes para CustomPaging
CustomPaging.propTypes = {
  productId: PropTypes.number.isRequired,  // Asegura que productId es un número y es requerido
};

export default CustomPaging;
