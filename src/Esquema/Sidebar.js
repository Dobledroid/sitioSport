import React, { useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";

const Sidebar = () => {
  const [user] = useLocalStorage("user");

  useEffect(() => {
    const hamBurger = document.querySelector(".toggle-btn");

    const handleClick = () => {
      document.querySelector("#sidebar").classList.toggle("expand");
    };

    hamBurger.addEventListener("click", handleClick);

    return () => {
      hamBurger.removeEventListener("click", handleClick);
    };
  }, []);

  const handleDropdownClick = () => {
    const sidebarDropdown = document.querySelector("#auth");
    sidebarDropdown.classList.toggle("show");
  };

  return (
    <>
      <aside id="sidebar">
        <div className="d-flex">
          <button className="toggle-btn" type="button">
            <i className="icon-menu"></i>
          </button>
          <div className="sidebar-logo">
            <p>Mi cuenta</p>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/perfil" className="sidebar-link">
              <i className="icon-user"></i>
              <span>Perfil</span>
            </Link>
          </li>
          {user && user.ID_rol === "1" && (
            <li className="sidebar-item">
              <button
                className="sidebar-link collapsed has-dropdown"
                onClick={handleDropdownClick}
              >
                <i className="icon-shopping-bag"></i>
                <span>Administrador</span>
              </button>
              <ul
                id="auth"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to="/AdmTiposMembresias" className="sidebar-link">
                    Membresías
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/AdmMembresiasClientes" className="sidebar-link">
                    Membresías clientes
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/AdmProductos" className="sidebar-link">
                    Productos
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/Compras" className="sidebar-link">
                    Compras
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
