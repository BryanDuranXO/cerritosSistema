import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import '../css/login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const Login = () => {

  const URL = 'http://localhost:8080/api/cerritos/persona/login'
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const login = async () =>{

    try{

      const response = await axios.post(URL, {
        username: username,
        password: pass
      });

      if(response.status ===200)  if (response.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: 'Bienvenido!',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            navigate('/ReservacionAdmin'); // Cambia '/home' por la ruta a la que quieras navegar después del login
        });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Por favor verifica tu usuario y contraseña.',
    });
    }

    } catch(error) {
      console.log(`el error es ${error}`);
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Por favor verifica tu usuario y contraseña.',
    });
    }

    
  }

  return (

    
    <>
      <CollapsibleExample />
      <Container className="contLog">
        <Form className="formulario" onSubmit={(e) => { e.preventDefault(); login(); }}>
          <Form.Group className="formu">
            <h1 className="ttl">Bienvenido</h1>
            <p className="inf">Ingresa con tu cuenta</p>

            <Form.Label htmlFor="Username">Usuario</Form.Label>
            <Form.Control type="text" name="Username" id="user" onChange={(e) =>{setUsername(e.target.value)}} />

            <Form.Label htmlFor="Pass">Contraseña</Form.Label>
            <Form.Control type="password" name="Pass" id="pass" onChange={(e)=>{setPass(e.target.value)}} />

            <Button className="form-submit-button" type="submit" >
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