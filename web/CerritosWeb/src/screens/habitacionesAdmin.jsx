import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import { faPlus } from "@fortawesome/free-solid-svg-icons";  
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

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

const customStyles2 = {
  content: {
    ...customStyles.content,
    height: '70%'
  },
};

import { faPlus } from "@fortawesome/free-solid-svg-icons";


function HabAdmin() {
  const [open, setOpen] = useState({ create: false, update: false, delete: false });
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const handleModalOpen = (type) => setOpen((prev) => ({ ...prev, [type]: true }));
  const handleModalClose = (type, message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
    setOpen((prev) => ({ ...prev, [type]: false }));
  };




  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className='logo' src={cerritos} alt="logo" />
        </div>
        <div className="subM2" ></div>
        <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
        <div onClick={() => { navigate('/Busqueda') }} className="subM">Buscar contrato</div>
        <div onClick={() => { navigate('/Usuarios') }} className="subM">Gestionar usuarios</div>
        <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Gestionar habitaciones</div>
        <div onClick={() => { navigate('/Perfil') }} className="subM">Perfil</div>
      </div>

      <div className="main">
        <div className="nav">
          <div className="nv">
            <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />
            John Doe
            <button className='butSal' onClick={() => { navigate('/Acceso') }}>Cerrar sesión</button>
          </div>
        </div>

        <div className="content">
          <div className="users2">
            <div className="add">
              <div className="textoUsers">Habitaciones</div>
              <div className="butoAdd">
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ fontSize: '15px', width: '100%', height: '30px', textAlign: 'center', padding: '1px' }}
                  onClick={() => handleModalOpen('create')}
                >
                  <FontAwesomeIcon icon={faPlus} /> Agregar habitación
                </button>
              </div>
            </div>

            <div className="separacion"></div>
            <div className="input">
              <div className="check">
                <label style={{ marginRight: '8px', marginBottom: '5px' }} htmlFor="Check">
                  Mostrar todas las habitaciones
                </label>
                <input
                  className='checkInput'
                  type="checkbox"
                  name="Check"
                  id="check"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>

              <label style={{ margin: '1%', fontWeight: '500' }} htmlFor="Search">Buscar habitación</label>
              <input
                style={{
                  margin: '1%',
                  borderRadius: '2px',
                  backgroundColor: '#D9D9D9',
                  borderStyle: 'none',
                  height: '55%',
                  textAlign: 'center'
                }}
                type="text"
                name="Search"
                id="search"
              />
            </div>
            <div className="HBCont">
              <div className="HBItem">
                <div className="HBItem-sub">
                  <p className="fs-3 text-center">Habitación premium</p>
                  <p className="fs-4">Descripción:</p>
                  <p className="fs-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aut a veniam officiis nobis nemo
                    ipsum accusamus perferendis debitis error, amet harum commodi laboriosam eius suscipit doloremque
                    eaque, nam iusto!
                  </p>
                  <p className="fs-5 fw-medium">Costo:</p>
                  <p className="fs-5 fw-medium">Costo por extras:</p>
                </div>

                <div className="HBItem-sub2">
                  <img className='HBimg' src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg" alt="img" />
                  <div className="sub2Btn">
                    <button type="button" className="btn btn-danger btn-sm">Eliminar</button>
                    <button type="button" className="btn btn-warning btn-sm">Actualizar</button>
                  </div>
                </div>
              </div>

             
              <div className="HBItem">
                <div className="HBItem-sub">
                  <p className="fs-3 text-center">Habitación premium</p>
                  <p className="fs-4">Descripción:</p>
                  <p className="fs-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aut a veniam officiis nobis nemo
                    ipsum accusamus perferendis debitis error, amet harum commodi laboriosam eius suscipit doloremque
                    eaque, nam iusto!
                  </p>
                  <p className="fs-5 fw-medium">Costo:</p>
                  <p className="fs-5 fw-medium">Costo por extras:</p>
                </div>

                <div className="HBItem-sub2">
                  <img className='HBimg' src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg" alt="img" />
                  <div className="sub2Btn">
                    <button type="button" className="btn btn-danger btn-sm">Eliminar</button>
                    <button type="button" className="btn btn-warning btn-sm">Actualizar</button>
                  </div>
                </div>
              </div>
              {/* End dynamic block */}
            </div>
          </div>
        </div>
      </div>

      <Modal
          isOpen={open.create}
          onRequestClose={() => handleModalClose('create', 'Habitación registrado exitosamente!')}
          style={customStyles}
        >
          <h2 style={{ fontWeight: 'bold' }}>Registrar Habitaciones</h2>
          <form>
            <div className="dt2">
            <input className='field2' type="text" name="pat" id="pat" placeholder='Zona' />
              <input className='field2' type="text" name="name" id="name" placeholder='Numero de habitacion' />
             
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles">
                <option value="" selected>Tipo</option>
                <option value="gerente">Sencilla</option>
                <option value="usuario">Doble</option>
                <option value="usuario">Familiar</option>
                <option value="usuario">Suite</option>
              </select>
            </div>
            
            <div className="dt1">
              <input type="email" name="mail" id="mail" className="field" placeholder='Capacidad' />
              <input type="text" name="user" id="user" className="field" placeholder='Costo' />
            </div>
            <div className="dt2">
            <input type="text" name="user" id="user" className="field2" placeholder='Costo extra' />
              <input type="text" name="user" id="user" className="field2" placeholder='Nombre de usuario' />
            </div>
            <div className="dt2">
              <input type="password" name="password" id="password" className="field2" placeholder='Contraseña' />
            </div>
            
            <div className="butFormMod">
              <button className='registerButt' onClick={() => handleModalClose('create', 'Usuario registrado exitosamente!')}>Registrar</button>
              <button className='cancelButt' onClick={() => handleModalClose('create', 'Registro cancelado')}>Cancelar</button>
            </div>
          </form>
        </Modal>
    </div>
  );
}

export default HabAdmin;
