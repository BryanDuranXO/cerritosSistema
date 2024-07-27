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
    persona: ''
  });

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get(URLreservas);
      const data = response.data.data;
      console.log('Datos recibidos de la API:', data);
      if (Array.isArray(data)) {
        const mappedEvents = mapEventos(data);
        setEventos(mappedEvents);
        console.log('Eventos mapeados:', mappedEvents);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener reservas:', error);
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
        persona: event.personaBeans && event.personaBeans.length > 0 ? event.personaBeans[0] : null
      };
    });
  };

  const generarColor = () => {
    const colors = ['#ff003c', '#ff8a00', '#fabe28', '#88c100', '#00c176'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleEventClick = (info) => {
    console.log('Evento seleccionado:', info.event.extendedProps);
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  const handleClose = () => {
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

  const handleCreateEvent = () => {
    // Aquí puedes hacer una solicitud para crear un nuevo evento
    console.log('Nuevo evento:', newEventData);
    handleClose();
  };

  const alertaCancel = () => {
    Swal.fire({
      icon: 'warning',
      title: '¿Cancelar evento?',
      text: 'La información del evento y huésped no se recuperará',
      showConfirmButton: true,
      showCancelButton: true
    })
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} >
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
              <p>Fecha de entrada: {new Date(selectedEvent.start).toLocaleString()}</p>
              <p>Fecha de salida: {new Date(selectedEvent.end).toLocaleString()}</p>
            </div>
          ) : (
            <div>
              <p>Aquí puedes agregar el formulario para crear un nuevo evento.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="danger" onClick={alertaCancel}>Cancelar evento</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleClose}>
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
                placeholder="Ingrese información de la persona"
                value={newEventData.persona}
                onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventPersona">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese información de la persona"
                value={newEventData.persona}
                onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventPersona">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese información de la persona"
                value={newEventData.persona}
                onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventPersona">
              <Form.Label>Télefono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese información de la persona"
                value={newEventData.persona}
                onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventPersona">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese información de la persona"
                value={newEventData.persona}
                onChange={(e) => setNewEventData({ ...newEventData, persona: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={handleCreateEvent}>Guardar evento</Button>
        </Modal.Footer>
      </Modal>

      <div className="contNav">
        <div className="side">
          <div className="imgag">
            <img className='logo' src={cerritos} alt="logo" />
          </div>
          <div className="subM2"></div>
          <div onClick={() => navigate('/ReservacionAdmin')} className="subM">Reservaciones</div>
          <div onClick={() => navigate('/Busqueda')} className="subM">Contratos</div>
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
                eventClick={handleEventClick}
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
