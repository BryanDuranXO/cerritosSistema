import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
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
    height: '80%',
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

  const [checked, setIsChecked] = useState(true);

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
  };

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
      };

      const respuesta = await axios.post(`${URLHAB}/`, newHab);
      console.log(`respuesta del axios post: ${respuesta.status}`);

      if (respuesta.status === 200) {
        setTipo('');
        setCapacidad('');
        setNumHab('');
        setCosto('');
        setExtra('');
        setEstado(true);
        setImg(img);
        toast.success('Habitación registrada exitosamente');
        setCreateOpen(false);
        getHabitaciones();
      }

    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

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
  };

  const ChangeStatus = async (id, estado, numero_habitacion) => {
    try {
      const response = await axios.patch(`${URLHAB}/${id}`, { estado: !estado });

      if (response.status === 200) {
        toast.success(`Estado de la habitación ${numero_habitacion} cambiado exitosamente`);
        getHabitaciones();
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la habitación:', error);
      toast.error('Error al cambiar el estado de la habitación');
    }
  };

  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className='logo' src={cerritos} alt="logo" />
        </div>
        <div className="subM2" ></div>
        <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
        <div onClick={() => { navigate('/Busqueda') }} className="subM">Contrato</div>
        <div onClick={() => { navigate('/Usuarios') }} className="subM">Usuarios</div>
        <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Habitaciones</div>
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
              <div className="textoUsers">Habitaciones</div>
              <div className="butoAdd">
                <button className="btn btn-primary" type="button" style={{ fontSize: '15px', width: '100%', height: '30px', textAlign: 'center', padding: '1px' }} onClick={() => OpenCreateModal()}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar habitación
                </button>
              </div>
            </div>

            <div className="separacion"></div>
            <div className="input">
              <div className="check">
                <label style={{ marginRight: '8px', marginBottom: '5px' }} htmlFor="Check">Mostrar todas las habitaciones</label>
                <input className='checkInput' type="checkbox" name="Check" id="check" checked={checked} onChange={() => setIsChecked(!checked)} />
              </div>

              <label style={{ margin: '1%', fontWeight: '500' }} htmlFor="Search">Buscar habitación</label>
              <input style={{ margin: '1%', borderRadius: '2px', backgroundColor: '#D9D9D9', borderStyle: 'none', height: '55%', textAlign: 'center' }} type="text" name="Search" id="search" />
            </div>

            <div className="HBCont">
              {totHab.map((habitacion) => (
                <div key={habitacion.id} className="HBItem">
                  <div className="ImgHab">
                    <img className='rounded mx-auto d-block HBimg' src={habitacion.img} alt="" />
                    <p className="text-capitalize fw-semibold">Tipo: <p className='text-info fw-semibold'>{habitacion.tipo}</p></p>
                  </div>
                  <div className="HBItem-sub">
                    <p className="text-capitalize fw-semibold">Número de habitación: {habitacion.numero_habitacion}</p>
                    <p className="text-capitalize fw-semibold">Costo: {habitacion.costo}</p>
                    <p className="text-capitalize fw-semibold">Precio Extra: {habitacion.extra}</p>
                    <p className="text-capitalize fw-semibold">Capacidad: {habitacion.capacidad}</p>
                    <p className={`text-capitalize fw-semibold ${habitacion.estado ? 'text-success' : 'text-danger'}`}>{habitacion.estado ? 'Disponible' : 'No disponible'}</p>

                  </div>
                  <div className="HBItem-sub2">
                  <button type="button" className="btn btn-outline-warning" style={{ marginRight: '5px' }} onClick={() => OpenUpdateModal(habitacion)}>Editar</button>
                    <button type="button" className={`btn ${habitacion.estado ? 'btn-outline-danger' : 'btn-outline-primary'}`} onClick={() => ChangeStatus(habitacion.id, habitacion.estado, habitacion.numero_habitacion)}>
                      {habitacion.estado ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Modal
              isOpen={createOpen}
              onRequestClose={closeModal}
              contentLabel="Agregar Habitación"
              style={customStyles}
            >
          <h2 style={{ fontWeight: 'bold' }}>Registrar Habitación</h2>
          <div className="dt1">
                <input type="text" className="field" placeholder='Número de habitación' value={numHab} onChange={(e)=>{setNumHab(e.target.value)}}  />
                <input type="text" className="field" value={capacidad} onChange={(e)=>{setCapacidad(e.target.value)}} placeholder='Capacidad' />
              </div>
              <div className="dt1">
                <input type="text" className="field" value={costo} onChange={(e)=>{setCosto(e.target.value)}} placeholder='Costo' />
                <input type="text" className="field" value={extra} onChange={(e)=> {setExtra(e.target.value)}} placeholder='Precio extra' />
              </div>
              <div className="dt1">
                <select className="field2" value={tipo} onChange={(e)=>{setTipo(e.target.value)}} name="" id="">
                  <option value="">Tipo de habitación</option>
                  <option value="Sencilla">Sencilla</option>
                  <option value="Doble">Doble</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div className="dt1">
                <input type="field" className="field2" readOnly placeholder='Imagen' />
              </div>
              <div className="butFormMod">
              <button className='registerButt' onClick={() => {agregarHabitacion()} }>Registrar</button>
              <button className='delButt'  onClick={() => {closeModal()} }>Cancelar</button>
            </div>
            </Modal>

            <Modal
              isOpen={updateOpen}
              onRequestClose={closeModal}
              contentLabel="Actualizar Habitación"
              style={customStyles}
            >
              <div className="form-group">
                <label htmlFor="tipo">Tipo:</label>
                <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="capacidad">Capacidad:</label>
                <input type="text" className="form-control" id="capacidad" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="numHab">Número de habitación:</label>
                <input type="text" className="form-control" id="numHab" value={numHab} onChange={(e) => setNumHab(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="costo">Costo:</label>
                <input type="text" className="form-control" id="costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="extra">Extras:</label>
                <input type="text" className="form-control" id="extra" value={extra} onChange={(e) => setExtra(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="img">URL de la imagen:</label>
                <input type="text" className="form-control" id="img" value={img} onChange={(e) => setImg(e.target.value)} />
              </div>
              <button type="button" className="btn btn-primary" onClick={actualizarHabitacion}>Actualizar</button>
              <button type="button" className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={closeModal}>Cancelar</button>
            </Modal>

          </div>
        </div>
      </div>

      <ToastContainer transition={Flip} />
    </div>
  );
}

export default HabAdmin;
