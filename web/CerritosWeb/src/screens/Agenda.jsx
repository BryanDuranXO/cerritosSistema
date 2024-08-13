import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/Nav.css';
import cerritos from '../assets/logocerritos.png';
import axios from 'axios';
import Swal from "sweetalert2";

function NavAdmin() {

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).split('/').reverse().join('-');

  const URLreservas = 'http://localhost:8080/api/cerritos/reservas/';

  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    title: '',
    start: '',
    end: '',
    contrato: '',
    persona: '',
    horaEntrada: '',
  });

  const [loading, setLoading] = useState(false); // Estado para el spinner

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [tel, setTel] = useState("");
  const [correo, setCorreo] = useState("");
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [hentrada, setHentrada] = useState("");
  const [hsalida, setHsalida] = useState("12:00:00");


  useEffect(() => {
    traerEventos();
  }, []);

  const traerEventos = async () => {
    try {
      const response = await axios.get(URLreservas);
      const data = response.data.data;
      console.log('Datos recibidos de la API:', data);
  
      const reservasFiltradas = data.filter(event => event.estado === true);
  
      if (Array.isArray(reservasFiltradas)) {
        const eventosTraidos = mapEventos(reservasFiltradas);
        setEventos(eventosTraidos);
        console.log('Eventos mapeados:', eventosTraidos);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
  };
  
  const CrearReserva = async (e) => {
    e.preventDefault();

    setLoading(true); //spinner

    const idContrato = generarIdContrato(nombre, paterno, materno);

    try {
      const newReserva = {
        fecha_entrada: entrada,
        fecha_salida: salida,
        hora_entrada: hentrada,
        contrato: idContrato,
        estado: true,
        habitacionesBean: {
          id: fk,
        },
      };

      const postReserva = await axios.post(URLReserva, newReserva);
      console.log("Reserva creada:", postReserva.data);

      const getReserva = await axios.get(`${URLReserva}${idContrato}`);
      const reservaId = getReserva.data.data.body.data.id;
      console.log("Reserva obtenida:", getReserva.data);

      const newPersonReserva = {
        nombre: nombre,
        paterno: paterno,
        materno: materno,
        correo: correo,
        telefono: tel,
        rolBean: {
          id: 2,
        },
        reservaBean: {
          id: reservaId,
        },
      };

      const postPersona = await axios.post(URLPersona, newPersonReserva);

      Swal.fire({
        icon: "success",
        title: "Reserva creada correctamente",
        timer: 2500,
      });

    } catch (error) {
      if (error.response) {
        console.error("Error en la solicitud:", error.response.status);
        console.error("Datos de error:", error.response.data);
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
      } else {
        console.error("Error", error.message);
      }
    } 
  };

  const mapEventos = (data) => {
    return data.map(event => {
      return {
        title: `${event.id}`,
        start: event.fecha_entrada,
        end: event.fecha_salida,
        backgroundColor: generarColor(),
        textColor: '#ffffff',
        borderColor: 'transparent',
        display: 'block',
        fontWeight: 'bold',
        contrato: event.contrato,
        persona: event.personaBeans && event.personaBeans.length > 0 ? event.personaBeans[0] : null,
        hora_entrada: event.hora_entrada,
      };
    });
  };

  const generarColor = () => {
    const colors = ['#ff003c', '#ff8a00', '#fabe28', '#88c100', '#00c176'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const EventClick = (info) => {
    console.log('Evento seleccionado:', info.event.extendedProps);
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  const Close = () => {
    setShowModal(false);
    setShowCreateModal(false);
    setSelectedEvent(null);
  };

  const abrirModalCreate = (info) => {
    setNewEventData({
      title: '',
      start: info.dateStr,
      end: '',
      contrato: '',
      persona: ''
    });
    setShowCreateModal(true);
  };

  const CrearEvento = () => {
    console.log('Nuevo evento:', newEventData);
    Close();
  };

  const cancelarEvento = async (id) => {
    console.log(id)
    try {
      const response = await axios.put(`${URLreservas}${id}`, { estado: false });
      Swal.fire({
        title: 'Reserva cancelada',
        icon: 'success',
        text: 'La reserva ha sido cancelada exitosamente'
      });
      traerEventos(); 
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Ha ocurrido un error al cancelar la reserva'
      });
    }
  };

  const CancelarReserva = async (idReserva) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Cancelar evento?',
      text: 'La información del evento y huésped no se recuperará',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    });
  
    if (result.isConfirmed) {
      cancelarEvento(idReserva);
      close()
    }
  };
  

  return (
    <>
      <Modal show={showModal} onHide={Close} >
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? `Evento: ${selectedEvent.title}` : 'Crear nuevo evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {selectedEvent ? (
    <div>
      <p className='fw-semibold'>Detalles de la reserva:</p>
      <p>Identificador: {selectedEvent.title}</p>
      <p>ID de reserva: {selectedEvent.extendedProps.contrato || 'No disponible'}</p>
      <p>
        Solicitante: {selectedEvent.extendedProps.persona ? (
          <>
            {selectedEvent.extendedProps.persona.nombre} {selectedEvent.extendedProps.persona.paterno} {selectedEvent.extendedProps.persona.materno}
          </>
        ) : (
          'Nombre no disponible'
        )}
      </p>
      <p>Teléfono: {selectedEvent.extendedProps.persona ? selectedEvent.extendedProps.persona.telefono : 'No disponible'}</p>
      <p>Fecha de entrada: {new Date(selectedEvent.start).toLocaleDateString()} {selectedEvent.extendedProps.hora_entrada}</p>
      <p>Fecha de salida: {new Date(selectedEvent.end).toLocaleDateString()} {selectedEvent.extendedProps.hora_salida}</p>
    </div>
  ) : (
    <div>
      <p>Nada ha sido seleccionado</p>
    </div>
  )}
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>Cerrar</Button>
          {selectedEvent && (
    <Button variant="danger" onClick={() => CancelarReserva(selectedEvent.title)}>Cancelar evento</Button>
  )}
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={Close}>
  <Modal.Header closeButton>
    <Modal.Title>Crear nueva reserva</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formEventStart">
        <Form.Label>Fecha de inicio</Form.Label>
        <Form.Control
          type="date"
          value={newEventData.start.split('T')[0]} // Formato de fecha
          onChange={(e) => setNewEventData({ ...newEventData, start: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventEnd">
        <Form.Label>Fecha de fin</Form.Label>
        <Form.Control
          type="date"
          value={newEventData.end.split('T')[0]} // Formato de fecha
          onChange={(e) => setNewEventData({ ...newEventData, end: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventPersona">
        <Form.Label>Nombre(s) del solicitante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del solicitante"
          value={newEventData.persona}
          onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventPersona">
        <Form.Label>Apellido paterno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del solicitante"
          value={newEventData.persona}
          onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventPersona">
        <Form.Label>Apellido Materno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del solicitante"
          value={newEventData.persona}
          onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventPersona">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del solicitante"
          value={newEventData.persona}
          onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formEventPersona">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del solicitante"
          value={newEventData.persona}
          onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formHabitacion">
        <Form.Label>Número de habitación</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese número de habitación"
          // Aquí puedes agregar el valor de nuevo evento si es necesario
        />
      </Form.Group>
      <Form.Group controlId="formSelectOption">
        <Form.Label>Habitación</Form.Label>
        <Form.Control as="select">
        <option selected>Habitacion</option>
          <option>Doble</option>
          <option>Sencilla </option>
          <option>Familiar</option>
          <option>Suite</option>
        </Form.Control>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={Close}>Cerrar</Button>
    <Button variant="primary" onClick={CrearEvento}>Guardar evento</Button>
  </Modal.Footer>
</Modal>


      <div className="contNav">
        <div className="side">
          <div className="imgag">
            <img className='logo' src={cerritos} alt="logo" />
          </div>
          <div className="subM2"></div>
          <div onClick={() => navigate('/ReservacionAdmin')} className="subM">Reservaciones</div>
          <div onClick={() => navigate('/Busqueda')} className="subM">Busqueda Rapida</div>
          <div onClick={() => navigate('/Usuarios')} className="subM">Huéspedes</div>
          <div onClick={() => navigate('/HabitacionesAdmin')} className="subM">Habitaciones</div>
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
            <div className="agenda">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                headerToolbar={{
                  start: 'today prev,next',
                  center: 'title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                buttonText={{
                  today: 'Hoy',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día'
                }}
                buttonIcons={{
                  prev: 'chevron-left',
                  next: 'chevron-right',
                  prevYear: 'chevrons-left',
                  nextYear: 'chevrons-right'
                }}
                themeSystem="bootstrap"
                titleFormat={{
                  year: 'numeric', month: 'long'
                }}
                dayMaxEventRows={true}
                height="100%"
                width="100%"
                events={eventos}
                locale="es"
                selectable={true}
                editable={true}
                dateClick={abrirModalCreate}
                eventClick={EventClick}
                eventDrop={(info) => alert('Evento movido a: ' + info.event.start)}
                eventResize={(info) => alert('Evento redimensionado a: ' + info.event.end)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavAdmin;
