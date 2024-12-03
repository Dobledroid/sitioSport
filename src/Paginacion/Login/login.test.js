import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
  test("renders login form elements", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verificar si los elementos principales del formulario están presentes
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Acceso/i })).toBeInTheDocument();
  });

  test("shows alert when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simular el envío del formulario sin llenar los campos
    fireEvent.click(screen.getByRole("button", { name: /Acceso/i }));

    // Verificar que se muestra una alerta
    expect(screen.getByText(/Por favor, ingresa todos los campos/i)).toBeInTheDocument();
  });

  test("submits form when fields are filled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Llenar los campos del formulario
    fireEvent.change(screen.getByLabelText(/Correo electrónico:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), {
      target: { value: "password123" },
    });

    // Simular el envío del formulario
    fireEvent.click(screen.getByRole("button", { name: /Acceso/i }));

    // No debería mostrar la alerta de campos vacíos
    expect(
      screen.queryByText(/Por favor, ingresa todos los campos/i)
    ).not.toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const toggleButton = screen.getByRole("button", { name: /Toggle Password Visibility/i });

    // La contraseña debería estar oculta inicialmente
    expect(passwordInput.type).toBe("password");

    // Simular clic en el botón para mostrar la contraseña
    fireEvent.click(toggleButton);

    // La contraseña debería estar visible
    expect(passwordInput.type).toBe("text");
  });
});
