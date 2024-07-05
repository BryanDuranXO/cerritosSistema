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

const customStyles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    width: '35%',
    height: '100%',
    margin: 'auto',
    backgroundColor: '#F6F8F9',
    border: '2px solid #1796FF',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '1px 5px 11px -1px rgba(176, 174, 176, 0.89)'
  },
};

Modal.setAppElement('#root');

function Usuarios() {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
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

  const traerPersonas = async () => {
    try {
      const response = await axios.get(`${URLusers}/`);
      console.log('La respuesta del axios es:', response.data);
  
      const data = response.data?.data?.body?.data;
  
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  };
  
  const NuevaPersona = async ()=>{

    const newPerson = {
        nombre: nombre,
      paterno: paterno,
      materno :materno,
      correo: correo,
      telefono: tel,
      username: username,
      password: pass,
      rolBean: {
          id: rol
      }
    }

    try {

      const response = await axios.post(`${URLusers}/`, newPerson);

      console.log(`respuesta del axios ${response}`)
      traerPersonas()
      setCreateOpen(false);
      toast.success('Persona registrada exitosamente!.');      
    } catch (error) {
      console.log(`error por: ${error}`)
    }

  }
  

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

  useEffect(() => {
    traerPersonas();
  }, []);

  const OpenCreateModal = () => {
    setCreateOpen(true);
  };

  const closeModal = () => {
    setCreateOpen(false);
    setUpdateOpen(false);
    toast.warning('Acción cancelada.');
  };


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
                <button className="btn btn-primary" type="button" style={{ fontSize: '15px', width: '100%', height: '30px', textAlign: 'center', padding: '1px' }} onClick={() => OpenCreateModal()}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar persona
                </button>
              </div>
            </div>

            <div className="separacion"></div>
            <div className="input">
              <label style={{ margin: '1%', fontWeight: '500' }} htmlFor="Search">Buscar Persona</label>
              <input style={{ margin: '1%', borderRadius: '2px', backgroundColor: '#D9D9D9', borderStyle: 'none', height: '25px', textAlign: 'center' }} type="text" name="Search" id="search" value={filtro} onChange={Busqueda}/>
            </div>
          </div>
        </div>

        <div className="tabla">
          <table id="example2" className="table text-nowrap mb-0 align-middle">
            <thead className="text-dark fs-4">
              <tr>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0">#</h6></th>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Nombre</h6></th>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Apellidos</h6></th>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Télefono</h6></th>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0">Correo</h6></th>
                <th className="border-bottom-0"><h6 className="fw-semibold mb-0" style={{ marginRight: '-3px' }}>Acciones</h6></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="border-bottom-0">
                    <h6 className="fw-semibold mb-0 text-capitalize">{index + 1}</h6>
                  </td>
                  <td className="border-bottom-0">
                    <h6 className="fw-semibold mb-0 text-capitalize">{user.nombre}</h6>
                  </td>
                  <td className="border-bottom-0">
                    <p className= "mb-0 fw-normal fw-semibold  text-capitalize">{user.paterno} {user.materno}</p>
                  </td>
                  <td className="border-bottom-0">
                    <p className="mb-0 fw-semibold  fw-normal">{user.telefono}</p>
                  </td>
                  <td className="border-bottom-0">
                    <p className="mb-0 fw-semibold  fw-normal">{user.correo}</p>
                  </td>
                  <td className="border-bottom-0">
                    <button type="button" className="btn btn-warning btn-sm" style={{ marginRight: '5px' }} onClick={() => handleModalOpen('update')}>Actualizar</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => EliminarUsuario(user.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
              isOpen={createOpen}
              onRequestClose={closeModal}
              contentLabel="Agregar Usuario"
              style={customStyles}
            >
          <h2 style={{ fontWeight: 'bold' }}>Registrar Usuario</h2>
          <div className="dt1">
                <input type="text" className="field" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} placeholder='Nombre(s)'   />
                <input type="text" className="field" value={tel} onChange={(e)=>{setTel(e.target.value)}} placeholder='Télefono' />
              </div>
              <div className="dt1">
                <input type="text" className="field" value={paterno} onChange={(e)=>{setPaterno(e.target.value)}}  placeholder='Apellido paterno' />
                <input type="text" className="field" value={materno} onChange={(e) =>{setMaterno(e.target.value)}} placeholder='Apellido materno' />
              </div>
              <div className="dt1">
                <input type="text" className="field2"  value={correo} onChange={(e)=>{setCorreo(e.target.value)}} placeholder='Correo electrónico' />
              </div>
              <div className="dt1">
                <input type="text" className="field2" value={username} onChange={(e)=>{setUsername(e.target.value)}}  placeholder='Nombre de usuario' />
              </div>
              <div className="dt1">
                <input type="password" className="field2" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder='Contraseña' />
              </div>
              <div className="dt1">
                <select className="field2" value={rol} onChange={(e)=>{setRol(e.target.value)}} name="" id="">
                  <option value="">Rol</option>
                  <option value="1">Gerente</option>
                  <option value="2">Huésped</option>
  
                </select>
              </div>
              <div className="butFormMod">
              <button className='registerButt' onClick={() => {NuevaPersona()} }>Registrar</button>
              <button className='delButt'  onClick={() => {closeModal()} }>Cancelar</button>
            </div>
            </Modal>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </div>
  );
}

export default Usuarios;
