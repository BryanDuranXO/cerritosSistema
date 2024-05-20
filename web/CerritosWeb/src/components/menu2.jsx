import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cerritos from '../assets/logocerritos.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/style.css'
import { useNavigate } from 'react-router-dom';

//! NAVBAR.TOGGLE SIRVE PARA CREAR EL 'MENU' DE DESPLIEGUE CUANDO LA PANTALLA SE HACE MAS PEQUEÑA

function CollapsibleExample() {

  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' style={{backgroundColor:'#111B2E', marginBottom: '15px', zIndex: 1000 }}>
        <img onClick={()=> {navigate('/Inicio')}} src={cerritos} alt="Logo" style={{ width: '5%', marginLeft: '8%', cursor: 'pointer'}} />
      <Container  >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor: 'white'}} /> 
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
          </Nav>
          <Nav>
          <Nav.Link onClick={() => { navigate('/inicio')}} style={{ fontSize: '20px', marginRight: '25px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', fontFamily: '"Istok Web", sans-serif', fontWeight: 200 }}>Inicio</Nav.Link>
          <Nav.Link onClick={() => { navigate('/Habitaciones')}} style={{ fontSize: '20px', marginRight: '25px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', fontFamily: '"Istok Web", sans-serif', fontWeight: 200 }}>Habitaciones</Nav.Link>
          <Nav.Link href="#deets" style={{ fontSize: '20px', marginRight: '25px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', fontFamily: '"Istok Web", sans-serif', fontWeight: 200 }}>Eventos sociales</Nav.Link>
          <Nav.Link href="#deets" style={{ fontSize: '20px', marginRight: '25px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', fontFamily: '"Istok Web", sans-serif', fontWeight: 200 }}>Contacto</Nav.Link>
          <Nav.Link href="#deets" style={{ fontSize: '20px', marginRight: '25px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', fontFamily: '"Istok Web", sans-serif', fontWeight: 200 }}>Acceso</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;