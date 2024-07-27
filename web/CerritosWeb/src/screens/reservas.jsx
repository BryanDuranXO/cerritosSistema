import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CollapsibleExample from "../components/menu2";
import "../css/reservacionForm.css";
import axios from "axios";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Reservas = () => {
  const location = useLocation();
  const { tipo, numero, fk } = location.state || { tipo: "", numero: "", fk: "" };
  const Navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];


  const URLReserva = 'http://localhost:8080/api/cerritos/reservas/';
  const URLPersona = 'http://localhost:8080/api/cerritos/persona/';

  const [users, setUsers] = useState([]);
  const [reservas, setReservas] = useState([]);
  
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [tel, setTel] = useState("");
  const [correo, setCorreo] = useState("");
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [hentrada, setHentrada] = useState("");
  const [hsalida, setHsalida] = useState("12:00:00");

  const traerPersonas = async () => {
    try {
      const response = await axios.get(URLPersona);
      const data = response.data?.data?.body?.data;

      if (Array.isArray(data)) {
        console.log(data)
        setUsers(data);
      } else {
        console.error(
          "Error: La estructura de datos recibida no es la esperada",
          response
        );
      }
    } catch (error) {
      console.error("Error al obtener personas:", error);
    }
  };

  useEffect(() => {
    traerPersonas();
  }, []);

  let contractCounter = 0; 

const generarIdContrato = (nombre, paterno, materno) => {
  const nombreAbreviado = (nombre[0] || 'X') + (paterno[0] || 'Y') + (materno[0] || 'Z');
  
  // Incrementar el contador
  contractCounter++;

  // Asegurar que el contador tenga 4 dígitos (rellenar con ceros si es necesario)
  const contadorFormato = contractCounter.toString().padStart(4, '0');

  // Generar el ID combinando la parte aleatoria y el contador
  return `${nombreAbreviado.toUpperCase()}${contadorFormato}`;
};


const handleCrearReserva = async (e) => {
  e.preventDefault();
  
  // Generar el ID de contrato
  const idContrato = generarIdContrato(nombre, paterno, materno);

  try {
    const newReserva = {
      fecha_entrada: entrada,
      fecha_salida: salida,
      hora_entrada: hentrada,
      hora_salida: hsalida,
      contrato: idContrato,
      estado: true,
      habitacionesBean: {
        id: fk
      }
    };

    // Guardar la reserva
    const postReserva = await axios.post(URLReserva, newReserva);
    console.log("Reserva creada:", postReserva.data);

    // Obtener la reserva recién creada
    const getReserva = await axios.get(`${URLReserva}${idContrato}`);
    const reservaId = getReserva.data.data.body.data.id;
    console.log("Reserva obtenida:", getReserva.data);

    // Asignar el ID de la reserva obtenida a los datos de la persona
    const newPersonReserva = {
      nombre: nombre,
      paterno: paterno,
      materno: materno,
      correo: correo,
      telefono: tel,
      username: "username",
      password: "pass",
      rolBean: {
        id: 2,
      },
      reservaBean: {
        id: reservaId
      }
    };

    // Guardar los datos de la persona
    const postPersona = await axios.post(URLPersona, newPersonReserva);
    console.log("Persona creada:", postPersona.data);

    Swal.fire({
      icon: "success",
      title: "Reserva creada correctamente",
      text: "Por favor verifica tu usuario y contraseña.",
      timer: 2500,
    });

    Navigate("/Inicio")

  } catch (error) {
    if (error.response) {
      // El servidor respondió con un estado de error
      console.error("Error en la solicitud:", error.response.status);
      console.error("Datos de error:", error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("Error en la solicitud:", error.request);
    } else {
      // Algo salió mal al configurar la solicitud
      console.error("Error", error.message);
    }
  }
};

  
  return (
    <>
      <CollapsibleExample />

      <div className="contenedorPrincipal">
        <div className="contformularioReserva">
          <div className="tituloForm">
            <p className="h3">Reserva de habitación</p>
          </div>

          <div className="formu">
            <div className="etiquetaInfo">
              <p className="h6 fw-semibold">Datos del solicitante</p>
            </div>
            <form onSubmit={handleCrearReserva}>
              <div className="fila">
                <div className="form-group ">
                  <label htmlFor="nombre">Nombre(s)</label>
                  <input
                    type="text"
                    className="form-control form-control-long"
                    id="nombre"
                    placeholder="Nombre(s)"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                  <input
                    type="text"
                    className="form-control form-control-long"
                    id="apellidoPaterno"
                    placeholder="Apellido Paterno"
                    value={paterno}
                    onChange={(e) => setPaterno(e.target.value)}
                  />
                </div>
              </div>

              <div className="fila">
                <div className="form-group  ">
                  <label htmlFor="apellidoMaterno">Apellido Materno</label>
                  <input
                    type="text"
                    className="form-control form-control-long "
                    id="apellidoMaterno"
                    placeholder="Apellido Materno"
                    value={materno}
                    onChange={(e) => setMaterno(e.target.value)}
                  />
                </div>

                <div className="form-group ">
                  <label htmlFor="correo">Correo electronico</label>
                  <input
                    type="email"
                    className="form-control form-control-long"
                    id="correo"
                    placeholder="Correo electronico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
              </div>

              <div className="fila">
                <div className="form-group  ">
                  <label htmlFor="telefono">Número de télefono</label>
                  <input
                    type="text"
                    className="form-control form-control-long "
                    maxLength={10}
                    id="telefono"
                    placeholder="Número de télefono"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>

                <div className="form-group ">
                  <label htmlFor="personas">Cantidad de personas</label>
                  <input
                    type="number"
                    className="form-control form-control-long"
                    id="personas"
                    min={0}
                    placeholder="Cantidad de personas"
                  />
                </div>
              </div>

              <div className="fila">
                <div className="form-group  ">
                  <label htmlFor="fechaLlegada">Fecha de llegada</label>
                  <input
                    type="date"
                    className="form-control form-control-long "
                    id="fechaLlegada"
                    placeholder="Fecha de llegada"
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)}
                  />
                </div>

                <div className="form-group ">
                  <label htmlFor="fechaSalida">Fecha de salida</label>
                  <input
                    type="date"
                    className="form-control form-control-long"
                    id="fechaSalida"
                    placeholder="Fecha de salida"
                    value={salida}
                    onChange={(e) => setSalida(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="horaLlegada">Hora de llegada</label>
                  <input
                    type="time"
                    className="form-control form-control-long"
                    id="horaLlegada"
                    placeholder="Hora llegada"
                    value={hentrada}
                    onChange={(e) => setHentrada(e.target.value)}
                  />
                </div>
              </div>
              <div className="etiquetaInfo">
                <p className="h6 fw-semibold">Datos de la habitación</p>
              </div>

              <div className="fila">
                <div className="form-group ">
                  <label htmlFor="tipoHabitacion">Tipo de habitación</label>
                  <input
                    type="text"
                    className="form-control form-control-long"
                    id="tipoHabitacion"
                    value={tipo}
                    readOnly
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="numeroHabitacion">Número de habitación</label>
                  <input
                    type="text"
                    className="form-control form-control-long"
                    id="numeroHabitacion"
                    value={numero}
                    readOnly
                  />
                </div>
              </div>

              <button type="submit">Reservar</button>
            </form>
          </div>
        </div>


        <div className="contImagenHab">

        <p className="h3">Fechas disponibles para la habitación {tipo}</p>
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
                locale="es"
                selectable={true}
                editable={true}
                validRange={{start: today}}
              />
              
              <div className="indicaciones">
  <div className="indi">
    <div className="cuadrito2"></div>
    <span>Fechas no disponibles</span>
  </div>

  <div className="indi">
    <div className="cuadrito1"></div>
    <span>Fechas ocupadas</span>
  </div>

  <div className="indi">
    <div className="cuadrito"></div>
    <span>Fechas disponibles</span>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default Reservas;