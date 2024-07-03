import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Flip, ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

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

function HabAdmin() {
  const URLHAB = 'http://localhost:8080/api/cerritos/habitaciones';

  const [totHab, setTotHab] = useState([]);
  const [tipo, setTipo] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [numHab, setNumHab] = useState('');
  const [costo, setCosto] = useState('');
  const [extra, setExtra] = useState('');
  const [estado, setEstado] = useState(true);
  const [img, setImg] = useState('https://firebasestorage.googleapis.com/v0/b/imagenes-5fef3.appspot.com/o/eibol.jpg?alt=media&token=f9979836-2a48-48bf-a999-5f3126670b91');
  const [selectedHab, setSelectedHab] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const navigate = useNavigate();

  const getHabitaciones = async () => {
    try {
      const response = await axios.get(`${URLHAB}/`);
      console.log('La respuesta del axios es:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setTotHab(response.data.data);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  }

  useEffect(() => {
    getHabitaciones();
  }, []);

  const agregarHabitacion = async () => {
    try {
      const newHab = {
        tipo: tipo,
        capacidad: capacidad,
        numero_habitacion: numHab,
        costo: costo,
        extra: extra,
        estado: estado,
        img: img
      }

      const respuesta = await axios.post(`${URLHAB}/`, newHab)
      console.log(`respuesta del axios post: ${respuesta.status}`)

      if (respuesta.status === 200) {
        setTipo('')
        setCapacidad('')
        setNumHab('')
        setCosto('')
        setExtra('')
        setEstado(true)
        setImg(img)
        toast.success('Habitación registrada exitosamente')
        setCreateOpen(false);
        getHabitaciones()
      }

    } catch (error) {
      console.log(`erroooor: ${error}`)
    }
  }

  const OpenCreateModal = () => {
    setCreateOpen(true);
  };

  const OpenUpdateModal = (habitacion) => {
    setSelectedHab(habitacion);
    setTipo(habitacion.tipo);
    setCapacidad(habitacion.capacidad);
    setNumHab(habitacion.numero_habitacion);
    setCosto(habitacion.costo);
    setExtra(habitacion.extra);
    setEstado(habitacion.estado);
    setImg(habitacion.img);
    setUpdateOpen(true);
  };

  const closeModal = () => {
    setCreateOpen(false);
    setUpdateOpen(false);
    toast.warning('Acción cancelada.');
  };

  const actualizarHabitacion = async () => {
    try {
      if (!selectedHab || !selectedHab.id) {
        toast.error('No se ha seleccionado ninguna habitación para actualizar.');
        return;
      }

      const updatedHab = {
        tipo: tipo,
        capacidad: capacidad,
        numero_habitacion: numHab,
        costo: costo,
        extra: extra,
        estado: estado,
        img: img
      };

      const response = await axios.patch(`${URLHAB}/${selectedHab.id}`, updatedHab);

      if (response.status === 200) {
        toast.success('Habitación actualizada exitosamente');
        setUpdateOpen(false);
        getHabitaciones();
      }
    } catch (error) {
      console.error('Error al actualizar la habitación:', error);
      toast.error('Error al actualizar la habitación');
    }
  };

  const handleLogout = () => {
    navigate('/Acceso');
  }

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
            <button className='butSal' onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>

        <div className="content">
          <div className="users2">
            <div className="add">
              <div className="textoUsers">Habitaciones</div>
              <div className="butoAdd">
                <button className="btn btn-primary" onClick={() => { OpenCreateModal() }} type="button"><FontAwesomeIcon icon={faPlus} /> Agregar habitación</button>
              </div>
            </div>
            <div className="card-body">
              <div className="list-group">
                {totHab.map((habitacion) => (
                  <div key={habitacion.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{habitacion.numero_habitacion}</h5>
                      <p>Capacidad: {habitacion.capacidad}</p>
                      <p>Extras: {habitacion.extra}</p>
                      <p>Estado: {habitacion.estado ? 'Activa' : 'Inactiva'}</p>
                    </div>
                    <div>
                      <button className='btn btn-warning me-2' onClick={() => OpenUpdateModal(habitacion)}>Modificar</button>
                      <button className='btn btn-danger' onClick={() => ChangeStatus(habitacion.id, habitacion.estado)}>
                        {habitacion.estado ? 'Deshabilitar' : 'Habilitar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              isOpen={createOpen}
              onRequestClose={closeModal}
              contentLabel="Agregar Habitación"
              style={customStyles}
            >
              <div className='form-group'>
                <h2>Agregar Habitación</h2>
                <form>
                  <label>Tipo</label>
                  <input className="form-control" type='text' value={tipo} onChange={(e) => setTipo(e.target.value)} required />
                  <label>Capacidad</label>
                  <input className="form-control" type='text' value={capacidad} onChange={(e) => setCapacidad(e.target.value)} required />
                  <label>Número de habitación</label>
                  <input className="form-control" type='text' value={numHab} onChange={(e) => setNumHab(e.target.value)} required />
                  <label>Costo</label>
                  <input className="form-control" type='text' value={costo} onChange={(e) => setCosto(e.target.value)} required />
                  <label>Extras</label>
                  <input className="form-control" type='text' value={extra} onChange={(e) => setExtra(e.target.value)} required />
                  <label>Estado</label>
                  <input className="form-control" type='checkbox' checked={estado} onChange={(e) => setEstado(e.target.checked)} />
                  <label>URL de la imagen</label>
                  <input className="form-control" type='text' value={img} onChange={(e) => setImg(e.target.value)} required />
                </form>
                <button className='btn btn-danger mt-4 me-2' onClick={closeModal}>Cancelar</button>
                <button className='btn btn-primary mt-4' onClick={agregarHabitacion}>Guardar</button>
              </div>
            </Modal>

            <Modal
              isOpen={updateOpen}
              onRequestClose={closeModal}
              contentLabel="Actualizar Habitación"
              style={customStyles}
            >
              <div className='form-group'>
                <h2>Actualizar Habitación</h2>
                <form>
                  <label>Tipo</label>
                  <input
                    className="form-control"
                    type='text'
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  />
                  <label>Capacidad</label>
                  <input
                    className="form-control"
                    type='text'
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    required
                  />
                  <label>Número de habitación</label>
                  <input
                    className="form-control"
                    type='text'
                    value={numHab}
                    onChange={(e) => setNumHab(e.target.value)}
                    required
                  />
                  <label>Costo</label>
                  <input
                    className="form-control"
                    type='text'
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    required
                  />
                  <label>Extras</label>
                  <input
                    className="form-control"
                    type='text'
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    required
                  />
                  <label>Estado</label>
                  <input
                    className="form-control"
                    type='checkbox'
                    checked={estado}
                    onChange={(e) => setEstado(e.target.checked)}
                  />
                  <label>URL de la imagen</label>
                  <input
                    className="form-control"
                    type='text'
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    required
                  />
                </form>
                <button className='btn btn-danger mt-4 me-2' onClick={closeModal}>Cancelar</button>
                <button className='btn btn-primary mt-4' onClick={actualizarHabitacion}>Actualizar</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer transition={Flip} />
    </div>
  );
}

export default HabAdmin;
