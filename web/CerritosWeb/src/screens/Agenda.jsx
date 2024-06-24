import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Nav.css';
import cerritos from '../assets/logocerritos.png';

function NavAdmin() {
  const navigate = useNavigate();

  // Define los eventos del calendario con colores
  const events = [
    { title: 'Evento 1', start: '2024-06-01', backgroundColor: '#FF5733', borderColor: '#C70039', textColor: '#ffffff' },
    { title: 'Evento 2', start: '2024-06-07', end: '2024-06-10', backgroundColor: '#33FF57', borderColor: '#28A745', textColor: '#000000' },
    { title: 'Evento 3', start: '2024-06-09T16:00:00', backgroundColor: '#3357FF', borderColor: '#1E90FF', textColor: '#ffffff' }
  ];

  const handleEventClick = (info) => {
    alert(`Evento: ${info.event.title}`);
    // Puedes navegar o realizar otras acciones aquí
  };

  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className='logo' src={cerritos} alt="logo" />
        </div>
        <div className="subM2"></div>
        <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
        <div onClick={() => { navigate('/Busqueda') }} className="subM">Contratos</div>
        <div onClick={() => { navigate('/Usuarios') }} className="subM">Huéspedes</div>
        <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Habitaciónes</div>
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
          <div className="agenda">
            <FullCalendar 
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
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
              events={events}
              locale="es" 
              selectable={true}
              editable={true}
              dateClick={(info) => alert('Fecha seleccionada: ' + info.dateStr)}
              eventClick={handleEventClick}
              eventDrop={(info) => alert('Evento movido a: ' + info.event.start)}
              eventResize={(info) => alert('Evento redimensionado a: ' + info.event.end)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavAdmin;
