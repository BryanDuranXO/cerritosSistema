import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";  
import Modal from 'react-modal';

const customStyles = {
  content: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'column',
    textAlign: 'center',
    width: '35%', 
    height: '90%', 
    margin: 'auto', 
    backgroundColor: '#FFFFFF',
    border: '2px solid #1796FF', 
    borderRadius: '10px', 
    padding: '20px' 
  },
};

Modal.setAppElement('#root');



const customStyles2 = {
  content: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'column',
    textAlign: 'center',
    width: '35%', 
    height: '70%', 
    margin: 'auto', 
    backgroundColor: '#FFFFFF',
    border: '2px solid #1796FF', 
    borderRadius: '10px', 
    padding: '20px' 
  },
};

function Usuarios() {

  const [open, setIsOpen] = useState(false);
  const [openUpdate, setIsOpenUpdate] = useState(false);
  const [openDelete, setIsOpenDelete] = useState(false);

  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openUpdateModal() {
    setIsOpenUpdate(true);
  }

  function closeUpdateModal() {
    setIsOpenUpdate(false);
  }
  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className='logo' src={cerritos} alt="logo" />
        </div>
        <div className="subM2"></div>
        <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
        <div onClick={() => { navigate('/Busqueda') }} className="subM">Buscar contrato</div>
        <div onClick={() => { navigate('/Usuarios') }} className="subM">Gestionar usuarios</div>
        <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Gestionar habitaciones</div>
        <div onClick={() => { navigate('/Perfil') }} className="subM">Perfil</div>
      </div>

      <div className="main">
        <div className="nav">
          <div className="nv">
            <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />John Doe
            <button className='butSal' onClick={() => { navigate('/Acceso') }}>Cerrar sesión</button>
          </div>
        </div>

        <div className="content">
          <div className="users2">
            <div className="add">
              <div className="textoUsers">Usuarios</div>
              <div className="butoAdd">
                <button className="btn btn-primary" onClick={openModal} type="button" style={{fontSize: '15px', width: '100%', height: '30px', textAlign:'center', padding: '1px'}}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar usuario
                </button>
              </div>
            </div>

            <div className="separacion"></div>
            <div className="input">
                <label style={{margin: '1%', fontWeight: '500'}} htmlFor="Search">Buscar usuario</label>
                <input style={{margin: '1%', borderRadius: '2px', backgroundColor:'#D9D9D9', borderStyle: 'none', height: '55%', textAlign: 'center'}} type="text" name="Search" id="search" />            
            </div>
            <div className="tabla">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Paterno</th>
                    <th scope="col">Rol</th>
                    <th scope="col" className='d-flex justify-content-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td colSpan="2" className='d-flex justify-content-center'>
                      <button type="button" className="btn btn-danger btn-sm m-1">Eliminar</button>
                      <button onClick={openUpdateModal} type="button" className="btn btn-warning btn-sm m-1">Actualizar</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td colSpan="2" className='d-flex justify-content-center'>
                      <button type="button" className="btn btn-danger btn-sm m-1">Eliminar</button>
                      <button type="button" className="btn btn-warning btn-sm m-1">Actualizar</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td colSpan="2" className='d-flex justify-content-center'>
                      <button type="button" className="btn btn-danger btn-sm m-1">Eliminar</button>
                      <button type="button" className="btn btn-warning btn-sm m-1">Actualizar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={open} 
        onRequestClose={closeModal}
        style={customStyles}
      >
          <h2 style={{fontWeight:'bold'}}>Registrar Usuario</h2>
          <form action="" >
            <div className="dt1" >
              <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono'/>
            </div>
            <div className="dt1" >
              <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' />
            </div>
            <div className="dt2">
              <input type="email" name="mail" id="mail" className="field2" placeholder='Correo electrónico' />
            </div>
            <div className="dt2">
              <input type="text" name="user" id="user" className="field2" placeholder='Nombre de usuario' />
            </div>
            <div className="dt2">
              <input type="text" name="user" id="user" className="field2" placeholder='Contraseña' />
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles" >
                <option value="" selected>Rol</option>
                <option value="gerente">Gerente</option>
                <option value="usuario">Usuario</option>

              </select>
            </div>

            <div className="butFormMod">
            <button className='registerButt' onClick={closeModal}>Registrar</button>
            <button className='cancelButt' onClick={closeModal}>Cancelar</button>

            </div>

          </form>
      </Modal>

      <Modal
        isOpen={openUpdate}
        onRequestClose={closeUpdateModal}
        style={customStyles2}
      >
           <h2 style={{fontWeight:'bold'}}>Editar Usuario</h2>
          <form action="" >
            <div className="dt1" >
              <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono'/>
            </div>
            <div className="dt1" >
              <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' />
            </div>
            <div className="dt2">
              <input type="email" name="mail" id="mail" className="field2" placeholder='Correo electrónico' />
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles" >
                <option value="" selected>Rol</option>
                <option value="gerente">Gerente</option>
                <option value="usuario">Usuario</option>

              </select>
            </div>

            <div className="butFormMod">
            <button className='editButt' onClick={closeUpdateModal}>Editar</button>
            <button className='cancelButt' onClick={closeUpdateModal}>Cancelar</button>

            </div>

          </form>
      </Modal>

    </div>
  );
}

export default Usuarios;
