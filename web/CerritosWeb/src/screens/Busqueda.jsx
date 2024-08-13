import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/busqueda.css";
import cerritos from "../assets/logocerritos.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Busqueda = () => {
  const navigate = useNavigate();

  const URLReserva = 'http://localhost:8080/api/cerritos/reservas/';
  const URLHab = 'http://localhost:8080/api/cerritos/habitaciones/';
  const [reservas, setReservas] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);
  const [contrato, setContrato] = useState('');
  const [imagenHabitacion, setImagenHabitacion] = useState('');
  const [nombreHabitacion, setNombreHabitacion] = useState('');
  const [mensaje, setMensaje] = useState('');  
  
  const getHabitaciones = async () => {
    try {
      const response = await axios.get(URLHab);
      console.log('La respuesta del axios es:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setHabitaciones(response.data.data);
      } else {
        console.error('Error: La estructura de datos recibida no es la esperada', response);
      }
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  };

  const traerReservas = async () => {
    setMensaje('');  
    try {
      const response = await axios.get(`${URLReserva}${contrato}`);
      if (response.data && response.data.data && response.data.data.body && response.data.data.body.data) {
        const datos = response.data.data.body.data;
        console.log(datos);
        setReservas(datos);
        buscarImagenHabitacion(datos.id);  
      } else {
        setReservas(null);  
        setMensaje('Reserva no disponible');  
      }
    } catch (error) {
      console.error('Error al traer las reservas:', error);
      setMensaje('Error al buscar el contrato');  
    }
  };

  const buscarImagenHabitacion = (idReserva) => {
    for (const habitacion of habitaciones) {
      for (const reserva of habitacion.reservaBeans) {
        if (reserva.id === idReserva) {
          setImagenHabitacion(habitacion.img);
          setNombreHabitacion(`Habitación ${habitacion.numero_habitacion}`); 
          return;
        }
      }
    }
    setImagenHabitacion('');
    setNombreHabitacion('');
  };

  useEffect(() => {
    getHabitaciones();
  }, []);

  return (
    <>
      <div className="contNav">
        <div className="side">
          <div className="imgag">
            <img className="logo" src={cerritos} alt="logo" />
          </div>
          <div className="subM2"></div>
          <div onClick={() => navigate("/ReservacionAdmin")} className="subM">
            Reservaciones
          </div>
          <div onClick={() => navigate("/Busqueda")} className="subM">
            Busqueda rapida
          </div>
          <div onClick={() => navigate("/Usuarios")} className="subM">
            Usuarios
          </div>
          <div onClick={() => navigate("/HabitacionesAdmin")} className="subM">
            Habitaciones
          </div>
          <div onClick={() => navigate("/Perfil")} className="subM">
            Perfil
          </div>
        </div>

        <div className="main">
          <div className="nav">
            <div className="nv">
              <img
                className="userPic"
                src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                alt="user"
              />
              John Doe
              <button className="butSal" onClick={() => navigate("/Acceso")}>
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="contenidoBusqueda">
            <div className="containerInput">
              <input
                type="text"
                className="form-control email-input"
                placeholder="Introduce el ID de contrato"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
              />
              <button type="button" className="btn btn-primary btn" onClick={traerReservas}>
                Buscar
              </button>
            </div>

            <div className="titReservacion">
              <h4 className="fw-semibold">Detalles sobre esta reserva</h4>
            </div>

            {mensaje && <p className="mensaje">{mensaje}</p>}  {/* Mostrar mensaje si existe */}

            {reservas && !mensaje && (
              <div className="detallesReservacion">
                <div className="detalleRserva">
                  <div className="infoHuesped">
                    <h5 className="fw-semibold">Huésped:</h5>
                    <h5 className="fw-semibold">
                      {reservas.personaBeans[0]?.nombre} {reservas.personaBeans[0]?.paterno} {reservas.personaBeans[0]?.materno}
                    </h5>
                  </div>

                  <div className="infoHuesped">
                    <h5 className="fw-semibold">Telefono:</h5>
                    <h5 className="fw-semibold">{reservas.personaBeans[0]?.telefono}</h5>
                  </div>

                  <div className="infoHuesped">
                    <h5 className="fw-semibold">Correo electrónico:</h5>
                    <h5 className="fw-semibold">{reservas.personaBeans[0]?.correo}</h5>
                  </div>

                  <div className="infoHuesped">
                    <h5 className="fw-semibold">Fecha de entrada:</h5>
                    <h5 className="fw-semibold">{new Date(reservas.fecha_entrada).toLocaleDateString()}</h5>
                  </div>

                  <div className="infoHuesped">
                    <h5 className="fw-semibold">Fecha de salida:</h5>
                    <h5 className="fw-semibold">{new Date(reservas.fecha_salida).toLocaleDateString()}</h5>
                  </div>
                </div>

                <div className="imgReservaHab">
                  {imagenHabitacion ? (
                    <>
                      <img src={imagenHabitacion} alt="Imagen de la habitación" className="imgHabDetail"/>
                      <p className="nombreHabitacion">{nombreHabitacion}</p>
                    </>
                  ) : (
                    <p>Imagen de la reserva o habitación</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Busqueda;
