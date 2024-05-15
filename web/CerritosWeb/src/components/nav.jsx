import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import cerritos from '../assets/cerritos.png';
import '../css/style.css'
export const Navegacion = () =>{
    const navigate = useNavigate();
    return(
        <>
            <Navbar style={{ backgroundColor: '#111B2E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={cerritos} alt="Logo" style={{ width: '65%', marginLeft: '25px' }} />
                    <Navbar.Brand href="/" style={{ color: '#FFFFFF', fontSize: '20px' }}></Navbar.Brand>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <Container style={{ backgroundColor: '#111B2E', display:'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Nav className="me-auto">
                            <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '28px', marginRight: '20px' }} >Inicio</Nav.Link>
                            <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '28px', marginRight: '20px' }}>Habitaciones</Nav.Link>
                            <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '28px', marginRight: '20px' }}>Eventos socilaes</Nav.Link>
                            <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '28px', marginRight: '20px' }}>Contacto</Nav.Link>
                            <Nav.Link className="bitch" onClick={()=> {navigate('/form-PDF')}} style={{ color: '#FFFFFF', fontSize: '28px', marginRight: '20px' }}>Acceso</Nav.Link>
                        </Nav>
                    </Container>
                </div>
            </Navbar>
            <div style={{ backgroundColor: '#F2FBFF' }}>
               
            </div>
        </>
    );
}

