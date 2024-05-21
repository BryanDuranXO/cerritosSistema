import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import '../css/login.css'

const Login = () => {
  return (
    <>
      <CollapsibleExample />
      <Container className="contLog">
        <Form className="formulario">
          <Form.Group className="formu">
            <h1 className="ttl">Bienvenido</h1>
            <p className="inf">Ingresa con tu cuenta</p>

            <Form.Label htmlFor="Username">Usuario</Form.Label>
            <Form.Control type="text" name="Username" id="user" />

            <Form.Label htmlFor="Pass">Contraseña</Form.Label>
            <Form.Control type="password" name="Pass" id="pass" />

            <Button className="form-submit-button" type="submit">
              Entrar
            </Button>

            <a href="#" className="forgot-password">
              Olvidaste tu contraseña?
            </a>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Login;