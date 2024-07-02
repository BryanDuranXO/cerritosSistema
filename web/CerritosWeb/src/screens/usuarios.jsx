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
import Swal from 'sweetalert2';

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
    backgroundColor: '#F6F8F9',
    border: '2px solid #1796FF',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '1px 5px 11px -1px rgba(176, 174, 176, 0.89)'
  },
};

const Usuarios = () => {
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

  const [usuarioEditar, setUsuarioEditar] = useState({
    id: '',
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    correo: '',
    username: '',
    password: '',
    rol: '',
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [filtro, setFiltro] = useState('');
  const Busqueda = (e) => {
    setFiltro(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      user.paterno.toLowerCase().includes(filtro.toLowerCase()) ||
      user.materno.toLowerCase().includes(filtro.toLowerCase()) ||
      user.telefono.includes(filtro) ||
      user.correo.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  useEffect(() => {
    traerPersonas();
  }, []);

  const traerPersonas = async () => {
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

  const AgregarPersonas = async () => {
    try {
      const usuario = {
        nombre: nombre,
        paterno: paterno,
        materno: materno,
        telefono: tel,
        correo: correo,
        username: username,
        password: pass,
        img: null,
        rolBean: {
          id: rol
        }
      };

      const response = await axios.post(`${URLusers}/`, usuario);
      if (response.status === 200) {
        setCreateOpen(false);
        traerPersonas()
        setNombre('');
        setPaterno('');
        setMaterno('');
        setTel('');
        setCorreo('');
        setUsername('');
        setPass('');
        setRol('');
        toast.success('Usuario registrado exitosamente!')
      }

    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  const OpenCreateModal = () => {
    setCreateOpen(true);
  };

  const OpenUpdateModal = (user) => {
    setUsuarioEditar({
      id: user.id,
      nombre: user.nombre,
      paterno: user.paterno,
      materno: user.materno,
      telefono: user.telefono,
      correo: user.correo,
      username: user.username,
      password: user.password,
      rol: user.rolBean && user.rolBean.id ? user.rolBean.id : '',
    });
    setUpdateOpen(true);
  };
  

  const closeModal = () => {
    setCreateOpen(false);
    setUpdateOpen(false);
    toast.warning('Acción cancelada.');
  };

  const ActualizarUsuario = async () => {
    try {
      const { id, ...usuarioActualizado } = usuarioEditar;
  
      const response = await axios.put(`${URLusers}/${usuarioEditar.id}`, usuarioActualizado);
  
      if (response.status === 200) {
        toast.success('Usuario actualizado exitosamente.');
        setUpdateOpen(false);
        traerPersonas();
      } else {
        toast.error('Error al actualizar el usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      if (error.response) {
        console.error('Detalle del error:', error.response.data);
        toast.error('Error: ' + error.response.data.message); // Muestra el mensaje de error del backend si está disponible
      } else {
        console.error('Error en la solicitud:', error.message);
        toast.error('Error al actualizar el usuario.');
      }
    }
  };
  
  
    
  const EliminarUsuario = async (userId) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro de eliminar a este usuario?",
      text: "La información no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirmacion.isConfirmed) {
      try {
        const response = await axios.delete(`${URLusers}/${userId}`);
        if (response.status === 200) {
          toast.success('Usuario eliminado exitosamente.');
          traerPersonas();
        } else {
          toast.error('No se pudo eliminar el usuario.');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        toast.error('Error al eliminar el usuario.');
      }
    } else {
      toast.warning('Acción cancelada.');
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
                <button className="btn btn-primary" onClick={OpenCreateModal} type="button" style={{ fontSize: '15px', width: '100%', height: '30px', textAlign: 'center', padding: '1px' }}>
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
              <input
                style={{ margin: '1%', borderRadius: '2px', backgroundColor: '#D9D9D9', borderStyle: 'none', height: '55%', textAlign: 'center' }}
                type="text"
                name="Search"
                id="search"
                value={filtro}
                onChange={Busqueda}
              />            
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
                            {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => (
                                <tr key={user.id}>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{user.id}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-capitalize">{user.nombre}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-capitalize">{user.paterno} {user.materno}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{user.telefono}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{user.correo}</h6></td>
                                  <td className="border-bottom-0"><h6 className="fw-semibold mb-0 text-primary">En estancia</h6></td>
                                  <td className="border-bottom-0">
                                    <button className="btn btn-warning btn-sm m-1" onClick={() => OpenUpdateModal(user)}>
                                      Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm m-1" onClick={() => EliminarUsuario(user.id)}>
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="border-bottom-0 text-center">Sin registros</td>
                              </tr>
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
          isOpen={createOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 style={{ fontWeight: '700' }}>Registrar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" value={nombre} onChange={(e) => { setNombre(e.target.value) }} placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" value={tel} onChange={(e) => { setTel(e.target.value) }} placeholder='Teléfono' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="pat" value={paterno} onChange={(e) => { setPaterno(e.target.value) }} placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" value={materno} onChange={(e) => { setMaterno(e.target.value) }} placeholder='Apellido Materno' />
            </div>
            <div className="dt1">
              <input className='field2' type="text" name="correo" value={correo} onChange={(e) => { setCorreo(e.target.value) }} placeholder='Correo electrónico' />
            </div>
            <div className="dt1">
              <input className='field2' type="text" name="user" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Nombre de usuario' />
            </div>
            <div className="dt1">
              <input className='field2' type="password" name="password" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder='Contraseña' />
            </div>
            <select className="field2" name="roles" value={usuarioEditar.rol} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, rol: e.target.value })}>
  <option value="">Rol</option>
  <option value="1">Admin</option>
  <option value="2">Huesped</option>
</select>

            <div className="butFormMod">
              <button className='registerButt' type="button" onClick={() => { AgregarPersonas() }} >Registrar</button>
              <button className='delButt' onClick={() => { closeModal() }} type="button">Cancelar</button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={updateOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 style={{ fontWeight: '700' }}>Editar Usuario</h2>
          <form>
            <div className="dt1">
              <input className='field' type="text" name="name" value={usuarioEditar.nombre} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, nombre: e.target.value })} placeholder='Nombre(s)' />
              <input className='field' type="text" name="tel" value={usuarioEditar.telefono} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, telefono: e.target.value })} placeholder='Teléfono' />
            </div>
            <div className="dt1">
              <input className='field' type="text" name="pat" value={usuarioEditar.paterno} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, paterno: e.target.value })} placeholder='Apellido Paterno' />
              <input className='field' type="text" name="mat" value={usuarioEditar.materno} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, materno: e.target.value })} placeholder='Apellido Materno' />
            </div>
            <div className="dt1">
              <input className='field2' type="text" name="correo" value={usuarioEditar.correo} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, correo: e.target.value })} placeholder='Correo electrónico' />
            </div>
            <div className="dt1">
              <input className='field2' type="text" name="user" value={usuarioEditar.username} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, username: e.target.value })} placeholder='Nombre de usuario' />
            </div>
            <div className="dt1">
              <input className='field2' type="password" name="password" value={usuarioEditar.password} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, password: e.target.value })} placeholder='Contraseña' />
            </div>
            <div className="dt1">
              <select className="field2" name="roles" value={usuarioEditar.rol} onChange={(e) => setUsuarioEditar({ ...usuarioEditar, rol: e.target.value })}>
                <option value="">Rol</option>
                <option value="1">Admin</option>
                <option value="2">Huesped</option>
              </select>
            </div>
            <div className="butFormMod">
              <button className='registerButt' onClick={() => ActualizarUsuario()} type="button" >Aceptar</button>
              <button className='delButt' onClick={() => closeModal()} type="button">Cancelar</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Usuarios;
