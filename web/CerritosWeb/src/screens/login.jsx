
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import CollapsibleExample from "../components/menu2";

import axios from "axios";
import "../css/login.css"; // Asegúrate de importar tu archivo CSS
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Agregar la clase al body cuando el componente se monta
    document.body.classList.add("login-body");
    // Remover la clase del body cuando el componente se desmonta
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  const URL = "http://localhost:8080/api/cerritos/persona/login";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const response = await axios.post(URL, {
        username: username,
        password: pass,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: "¡Bienvenido!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/ReservacionAdmin"); // Cambia '/ReservacionAdmin' por la ruta a la que quieras navegar después del login
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "Por favor verifica tu usuario y contraseña.",
        });
      }
    } catch (error) {
      console.error("Error al realizar el login:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el login",
        text: "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.",
      });
    }
  };

  return (
    <>
      <CollapsibleExample />
      <Container className="contLog">
        <Form
          className="formulario"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <Form.Group className="formu">
            <h1 className="ttl">¡Bienvenido!</h1>
            <p className="inf">Ingresa con tu cuenta</p>

            <Form.Label htmlFor="Username" className="bold-label">
              Usuario
            </Form.Label>
            <Form.Control
              type="text"
              name="Username"
              id="user"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Form.Label htmlFor="Pass" className="bold-label">
              Contraseña
            </Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "password" : "text"}
                name="Pass"
                id="pass"
                onChange={(e) => setPass(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              />
            </div>

            <Button className="form-submit-button" type="submit">
              Entrar
            </Button>

            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Login;
