import React, { useRef } from "react";
import ImagenDefault from "./images/user.svg";
import ImagenCambio from "./images/image-pen.svg";
import PropTypes from "prop-types"; 
import "./UserProfile.css";

const UserProfile = ({ userImage }) => {
  const inputRef = useRef(null);

  const handleImageUpload = async (formData) => {
    alert("Imagen subiendo, nah puro pedo... no jala xd")
   
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      handleImageUpload(formData);
    }
  };

  return (
    <div className="user-profile">
      <div className="image-container">
        <div className="container">
        <img
          src={userImage ? userImage : ImagenDefault}
          alt="Imagen del usuario"
          className="user-image p-2"
          onClick={handleClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src={ImagenCambio}
          alt="Cambiar imagen"
          className="change-image"
          onClick={handleClick}
        />
        </div>
        
      </div>
    </div>
  );
};


UserProfile.propTypes = {
  userImage: PropTypes.string,  // userImage es una cadena (puede ser nulo o indefinido)
};

export default UserProfile;
