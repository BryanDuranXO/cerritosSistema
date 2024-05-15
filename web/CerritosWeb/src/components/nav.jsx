import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import cerritos from '../assets/logocerritos.png';
import '../CSS/style.css';

export const Navegacion = () =>{
    const navigate = useNavigate();
    return(
        <>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#111B2E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Navbar.Brand href="/" style={{ color: '#FFFFFF', fontSize: '20px' }}>
                    <img src={cerritos} alt="Logo" style={{ width: '45%', marginLeft: '25px' }} />
                </Navbar.Brand>
              \
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '20px' }}>Inicio</Nav.Link>
                        <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '20px' }}>Habitaciones</Nav.Link>
                        <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '20px' }}>Eventos sociales</Nav.Link>
                        <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '20px' }}>Contacto</Nav.Link>
                        <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '20px' }}>Acceso</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div style={{ backgroundColor: '#F2FBFF' }}>
            </div>
        </>
    );
}
