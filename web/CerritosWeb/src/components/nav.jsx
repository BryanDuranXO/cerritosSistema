import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cerritos from '../assets/logocerritos.png';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import '../css/Nav.css';
import { useNavigate } from 'react-router-dom';


function NavAdmin() {
  const navigate = useNavigate();

  return (
      <div className="contNav">
        

        <div className="side">

          <div className="imgag">
            <img className='logo' src={cerritos} alt="logo" />
            Cerritos Xochitepec
          </div>
          <div className="subM2"></div>
          <div onClick={()=>{navigate('/Agenda')}} className="subM">Reservaciones</div>
          <div onClick={()=>{navigate('/Busqueda')}} className="subM">Buscar contrato</div>
          <div onClick={()=>{navigate('/Usuarios')}} className="subM">Gestionar usuarios</div>
          <div onClick={()=>{navigate('/Habitaciones')}} className="subM">Gestionar habitaciones</div>
          <div onClick={()=>{navigate('/Perfil')}} className="subM">Perfil</div>

        </div>

        <div className="nav">

        <div className="nv">
        <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />John Doe
          
          <button className='butSal' onClick={()=>{navigate('/Acceso')}}>Cerrar sesión</button>
        </div>
        </div>

      </div>
      );
}

export default NavAdmin;
