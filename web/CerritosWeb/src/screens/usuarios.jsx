import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
  const navigate = useNavigate();
  const URLusers = 'http://localhost:8080/api/cerritos/persona';

  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [tel, setTel] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [rol, setRol] = useState('');

  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
  const [open, setOpen] = useState({
    create: false,
    update: false,
    delete: false
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URLusers}/`);
      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.data && response.data.data.body && Array.isArray(response.data.data.body.data)) {
        setUsers(response.data.data.body.data);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModalOpen = (type) => setOpen(prev => ({ ...prev, [type]: true }));

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
    setOpen(prev => ({ ...prev, [type]: false }));
  };

  const handleEditUser = (userId) => {
    console.log("Editar usuario con ID:", userId);
    // Encuentra al usuario por su ID en el array de usuarios
    const userToEdit = users.find(user => user.id === userId);
    setSelectedUser(userToEdit); 
    setOpen(prev => ({ ...prev, update: true }));
  };
  

  // Función para eliminar usuario
  const handleDeleteUser = async () => {
    if (!selectedUser || !selectedUser.id) {
      console.error('No se ha seleccionado un usuario válido para eliminar.');
      toast.error('Error al eliminar usuario. Asegúrate de seleccionar un usuario válido.');
      return;
    }

    try {
      const response = await axios.delete(`${URLusers}/${selectedUser.id}`);

      if (response.status === 200) {
        handleModalClose('delete', 'Usuario eliminado exitosamente!');
        fetchUsers(); // Actualiza la lista de usuarios después de eliminar
      } else {
        toast.error('Error al eliminar usuario. Inténtelo nuevamente.');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error al eliminar usuario. Inténtelo nuevamente.');
    }
  };


  const handleSubmitEditUser = async () => {
    try {
      if (!selectedUser || !selectedUser.rol) {
        console.error('Error: El usuario seleccionado o su rol no están definidos correctamente.');
        return;
      }
  
      const response = await axios.put(`${URLusers}/${selectedUser.id}`, {
        nombre: selectedUser.nombre,
        paterno: selectedUser.paterno,
        materno: selectedUser.materno,
        telefono: selectedUser.telefono,
        correo: selectedUser.correo,
        username: selectedUser.username,
        password: selectedUser.password,
        rolBean: {
          id: selectedUser.rol.id
        }
      });
  
      if (response.status === 200) {
        handleModalClose('update', 'Usuario editado exitosamente!');
        fetchUsers(); // Actualiza la lista de usuarios después de editar
      } else {
        toast.error('Error al editar usuario. Inténtelo nuevamente.');
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
      toast.error('Error al editar usuario. Inténtelo nuevamente.');
    }
  };
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setNombre(value);
        break;
      case 'pat':
        setPaterno(value);
        break;
      case 'mat':
        setMaterno(value);
        break;
      case 'tel':
        setTel(value);
        break;
      case 'correo':
        setCorreo(value);
        break;
      case 'user':
        setUsername(value);
        break;
      case 'password':
        setPass(value);
        break;
      case 'roles':
        setRol(value);
        break;
      default:
        break;
    }
  };
  // Función para registrar nuevo usuario
  const handleRegisterUser = async () => {
    try {
      const newUser = {
        nombre: nombre,
        paterno: paterno,
        materno: materno,
        telefono: tel,
        correo: correo,
        username: username,
        password: pass,
        img: '',
        rolBean: {
          id: rol
        }
      };

      const response = await axios.post(`${URLusers}/`, newUser);

      if (response.status === 200) {
        handleModalClose('create', 'Usuario registrado exitosamente!'); // Aquí se ajusta el mensaje
        fetchUsers(); // Actualiza la lista de usuarios
        // Limpia los campos del formulario después de registrar
        setNombre('');
        setPaterno('');
        setMaterno('');
        setTel('');
        setCorreo('');
        setUsername('');
        setPass('');
        setRol('');
      } else {
        toast.error('Error al registrar usuario. Inténtelo nuevamente.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.response); 
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error('Error al registrar usuario. Inténtelo nuevamente.');
      }
    }
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
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Nombre(s)</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Apellidos</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Telefono</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Correo</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Estatus</h6></th>
                              <th className="border-bottom-0"><h6 className="fw-semibold mb-0" style={{ marginRight: '-3px' }}>Acciones</h6></th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.length === 0 ? (
                              <tr>
                                <td colSpan="7" className="border-bottom-0 text-center">Sin registros</td>
                              </tr>
                            ) : (
                              users.map((usuario, index) => (
                                <tr key={usuario.id}>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-capitalize">{usuario.nombre}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-capitalize">{usuario.paterno} {usuario.materno}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{usuario.telefono}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{usuario.correo}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-primary">En estancia</h6></td>
                                  <td className="border-bottom-0">
                                    <button className="btn btn-warning btn-sm m-1" onClick={() => handleEditUser(usuario.id)}>
                                      Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm m-1" onClick={() => handleDeleteUser(usuario.id)}>
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
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
          onRequestClose={() => handleModalClose('create', 'Cerrar modal')}
          style={customStyles}
        >
          <h2 style={{ fontWeight: 'bold' }}>Registrar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" value={nombre} onChange={handleChange} placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" value={tel} onChange={handleChange} placeholder='Teléfono' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="pat" value={paterno} onChange={handleChange} placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" value={materno} onChange={handleChange} placeholder='Apellido Materno' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="correo" value={correo} onChange={handleChange} placeholder='Correo electrónico' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="user" value={username} onChange={handleChange} placeholder='Nombre de usuario' />
            </div>
            <div className="dt1">
              <input className='field' type="password" name="password" value={pass} onChange={handleChange} placeholder='Contraseña' />
            </div>
            <div className="dt1">
              <select className="field" name="roles" value={rol} onChange={handleChange}>
                <option value="">Rol</option>
                <option value="1">Admin</option>
                <option value="2">Huesped</option>
              </select>
            </div>
            <div className="butFormMod">
              <button className='butAcc' type="button" onClick={handleRegisterUser}>Aceptar</button>
              <button className='butCan' onClick={() => setOpen(prev => ({ ...prev, create: false }))} type="button">Cancelar</button>
            </div>
          </form>
        </Modal>

<Modal
  isOpen={open.update}
  onRequestClose={() => handleModalClose('update', 'Usuario editado exitosamente!')}
  style={customStyles2}
>
  <h2 style={{ fontWeight: 'bold' }}>Editar Usuario</h2>
  {selectedUser && (
    <form>
      <div className="dt1">
        <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' value={selectedUser.nombre} onChange={(e) => setSelectedUser({ ...selectedUser, nombre: e.target.value })} />
        <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono' value={selectedUser.telefono} onChange={(e) => setSelectedUser({ ...selectedUser, telefono: e.target.value })} />
      </div>
      <div className="dt1">
        <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' value={selectedUser.paterno} onChange={(e) => setSelectedUser({ ...selectedUser, paterno: e.target.value })} />
        <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' value={selectedUser.materno} onChange={(e) => setSelectedUser({ ...selectedUser, materno: e.target.value })} />
      </div>
      <div className="dt1">
        <input className='field' type="text" name="correo" id="correo" placeholder='Correo electrónico' value={selectedUser.correo} onChange={(e) => setSelectedUser({ ...selectedUser, correo: e.target.value })} />
      </div>
      <div className="dt1">
        <input className='field' type="text" name="user" id="user" placeholder='Nombre de usuario' value={selectedUser.username} readOnly />
      </div>
      <div className="dt1">
        <input className='field' type="password" name="password" id="password" placeholder='Contraseña' value={selectedUser.password} readOnly />
      </div>
      <div className="dt1">
      {selectedUser && selectedUser.rol && (
  <select className="field" name="roles" value={selectedUser.rol.id} disabled>
    <option value="">Rol</option>
    <option value="1">Admin</option>
    <option value="2">Huesped</option>
  </select>
)}
      </div>
      <div className="butFormMod">
        <button className='butAcc' type="button" onClick={handleSubmitEditUser}>Aceptar</button>
        <button className='butCan' onClick={() => setOpen(prev => ({ ...prev, update: false }))} type="button">Cancelar</button>
      </div>
    </form>
  )}
</Modal>




        {/* Modal para Eliminar Usuario */}
        <Modal
          isOpen={open.delete}
          onRequestClose={() => handleModalClose('delete', 'Usuario eliminado exitosamente!')}
          style={customStyles2}
        >
          <h2 style={{ fontWeight: 'bold' }}>Eliminar Usuario</h2>
          {selectedUser && (
            <form>
              <div className="dt1">
                <input className='field' type="text" name="name" id="name" placeholder='Nombre(s)' defaultValue={selectedUser.nombre} />
                <input className='field' type="text" name="tel" id="tel" placeholder='Teléfono' defaultValue={selectedUser.telefono} />
              </div>
              <div className="dt1">
                <input className='field' type="text" name="pat" id="pat" placeholder='Apellido Paterno' defaultValue={selectedUser.paterno} />
                <input className='field' type="text" name="mat" id="mat" placeholder='Apellido Materno' defaultValue={selectedUser.materno} />
              </div>
              <div className="dt1">
                <input className='field' type="text" name="correo" id="correo" placeholder='Correo electrónico' defaultValue={selectedUser.correo} />
              </div>
              <div className="butFormMod">
                <button className='butAcc' type="button">Aceptar</button>
                <button className='butCan' onClick={() => setOpen(prev => ({ ...prev, delete: false }))} type="button">Cancelar</button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Usuarios;
