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
    document.body.classList.add("login-body");
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  const URL = "http://localhost:8080/api/cerritos/persona/one/";
  const url = "http://localhost:8080/api/auth/signin"; // CON JWT
  const urlRol = "http://localhost:8080/api/cerritos/rol/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const response = await axios.post(url, {
        username: username,
        password: pass,
      });

      if (response.status === 200) {
        const token = response.data.data; 
        localStorage.setItem("token", token);

        // Obtener la información del usuario
        const personResponse = await axios.get(`${URL}${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const responsePerson = personResponse.data.data;
        localStorage.setItem("persona", JSON.stringify(responsePerson));

        // Obtener los roles del usuario
        const rolesResponse = await axios.get(urlRol, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const roles = rolesResponse.data.data;

        // Encuentra el rol del usuario
        const userRole = roles.find(role => 
          role.personaBeans.some(person => person.username === username)
        );

        if (userRole) {
          // Redirige según el ID del rol
          if (userRole.id === 1) {
            navigate("/ReservacionAdmin");
          } else if (userRole.id === 2) {
            navigate("/UserVista");
          } else {
            Swal.fire({
              icon: "error",
              title: "Rol desconocido",
              text: "No se ha encontrado un rol válido para el usuario.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Rol no encontrado",
            text: "No se pudo encontrar el rol del usuario.",
          });
        }
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
                type={showPassword ? "text" : "password"} // Cambié el orden aquí para que funcione correctamente
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
