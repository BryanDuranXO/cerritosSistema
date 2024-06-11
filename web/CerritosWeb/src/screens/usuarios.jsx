import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

Modal.setAppElement('#root');

function Usuarios() {
  const [open, setOpen] = useState({ create: false, update: false, delete: false });
  const navigate = useNavigate();

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
        <div className="subM2"></div>
        <div onClick={() => navigate('/ReservacionAdmin')} className="subM">Reservaciones</div>
        <div onClick={() => navigate('/Busqueda')} className="subM">Buscar contrato</div>
        <div onClick={() => navigate('/Usuarios')} className="subM">Gestionar usuarios</div>
        <div onClick={() => navigate('/HabitacionesAdmin')} className="subM">Gestionar habitaciones</div>
        <div onClick={() => navigate('/Perfil')} className="subM">Perfil</div>
      </div>

      <div className="main">
        <div className="nav">
          <div className="nv">
            <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />John Doe
            <button className='butSal' onClick={() => navigate('/Acceso')}>Cerrar sesión</button>
          </div>
        </div>

        <div className="content">
          <div className="users2">
            <div className="add">
              <div className="textoUsers">Usuarios</div>
              <div className="butoAdd">
                <button className="btn btn-primary" onClick={() => handleModalOpen('create')} type="button" style={{ fontSize: '15px', width: '100%', height: '30px', textAlign: 'center', padding: '1px' }}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar usuario
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={1500}
                  limit={5}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Flip}
                />
              </div>
            </div>

            <div className="separacion"></div>
            <div className="input">
              <label style={{ margin: '1%', fontWeight: '500' }} htmlFor="Search">Buscar usuario</label>
              <input style={{ margin: '1%', borderRadius: '2px', backgroundColor: '#D9D9D9', borderStyle: 'none', height: '55%', textAlign: 'center' }} type="text" name="Search" id="search" />
            </div>
            <div className="tabla">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                  <div className="card w-100">
                    <div className="card-body p-3">
                      <div className="table-responsive">
                        <table id="example2" className="table text-nowrap mb-0 align-middle">
                          <thead className="text-dark fs-4">
                            <tr>
                            <th className="border-bottom-0"><h6 className="fw-semibold mb-0">#</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Nombre</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Paterno</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0" style={{ marginRight: '-3px' }}>Acciones</h6></th>
                           
                              
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                            <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">1</h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Maria Fernanda</h6>
                              </td>
                              <td className="border-bottom-0">
                                <p className="mb-0 fw-normal">Paterno</p>
                              </td>
                              <td className="border-bottom-0">
                                <button type="button" className="btn btn-warning btn-sm"style={{ marginRight: '5px' }}onClick={() => handleModalOpen('update')}>Actualizar</button>
                                <button type="button" className="btn btn-danger btn-sm"onClick={() => handleModalOpen('delete')}>Eliminar</button>
                              </td>
                           
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Modal
          isOpen={open.create}
          onRequestClose={() => handleModalClose('create', 'Usuario registrado exitosamente!')}
          style={customStyles}
        >
          <h2 style={{ fontWeight: 'bold' }}>Registrar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono' />
            </div>
            <div className="dt1">
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
              <input type="password" name="password" id="password" className="field2" placeholder='Contraseña' />
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles">
                <option value="" selected>Rol</option>
                <option value="gerente">Gerente</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
            <div className="butFormMod">
              <button className='registerButt' onClick={() => handleModalClose('create', 'Usuario registrado exitosamente!')}>Registrar</button>
              <button className='cancelButt' onClick={() => handleModalClose('create', 'Registro cancelado')}>Cancelar</button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={open.update}
          onRequestClose={() => handleModalClose('update', 'Usuario editado exitosamente!')}
          style={customStyles2}
        >
          <h2 style={{ fontWeight: 'bold' }}>Editar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' />
            </div>
            <div className="dt2">
              <input type="email" name="mail" id="mail" className="field2" placeholder='Correo electrónico' />
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles">
                <option value="" selected>Rol</option>
                <option value="gerente">Gerente</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
            <div className="butFormMod">
              <button className='editButt' onClick={() => handleModalClose('update', 'Usuario editado exitosamente!')}>Editar</button>
              <button className='cancelButt' onClick={() => handleModalClose('update', 'Edición cancelada')}>Cancelar</button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={open.delete}
          onRequestClose={() => handleModalClose('delete', 'Usuario eliminado exitosamente!')}
          style={customStyles2}
        >
          <h2 style={{ fontWeight: 'bold' }}>Eliminar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' />
            </div>
            <div className="dt2">
              <input type="email" name="mail" id="mail" className="field2" placeholder='Correo electrónico' />
            </div>
            <div className="dt2">
              <select className="field2" name="roles" id="roles">
                <option value="" selected>Rol</option>
                <option value="gerente">Gerente</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
            <div className="butFormMod">
              <button className='delButt' onClick={() => handleModalClose('delete', 'Usuario eliminado exitosamente!')}>Eliminar</button>
              <button className='cancelButt2' onClick={() => handleModalClose('delete', 'Eliminación cancelada')}>Cancelar</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Usuarios;
