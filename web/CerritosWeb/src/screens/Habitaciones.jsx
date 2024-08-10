import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import '../css/habitaciones.css';
import axios from "axios";

const Habitaciones = () => {
  const navigate = useNavigate();

  const URLHab = 'http://localhost:8080/api/cerritos/habitaciones/';
  const [Hab, setHab] = useState([]);
  const [filter, setFilter] = useState("Todos");

  const handleReservationClick = (habitacion) => {
    navigate('/reservacion', { state: { tipo: habitacion.tipo, numero: habitacion.numero_habitacion, fk: habitacion.id } });
  };

  const getHabitaciones = async () => {
    try {
      const response = await axios.get(URLHab);

      if (response.data && Array.isArray(response.data.data)) {
        setHab(response.data.data);
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredHabitaciones = Hab.filter((habitacion) => {
    // Solo mostrar habitaciones con estatus true
    if (habitacion.estado !== true) {
      return false;
    }

    // Aplicar el filtro de tipo
    if (filter === "Todos") {
      return true;
    }
    return habitacion.tipo === filter;
  });

  return (
    <>
      <CollapsibleExample />

      <div className="etiqueta">
        Nuestras habitaciones disponibles
      </div>

      <div className="filtro">
        <select className="form-select" aria-label="Default select example" value={filter} onChange={handleFilterChange}>
          <option value="Todos">Todas las habitaciones</option>
          <option value="Familiar">Familiar</option>
          <option value="Sencilla">Sencilla</option>
          <option value="Doble">Doble</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div className="contHabit">
        {filteredHabitaciones.map((habitacion, index) => (
          <div className="item" key={index}>
            <div className="sub">
              <div className="titulo">Habitación {habitacion.tipo}</div>
              <div className="txt">{habitacion.descripcion}</div>
              <div className="price">Precio por hospedaje: ${habitacion.costo}</div>
              <div className="price">Precio por extras: ${habitacion.extra}</div>
              <div className="extras">Capacidad máxima de {habitacion.capacidad} personas</div>
              <div className="dbtn">
                <button className="btnh" onClick={() => handleReservationClick(habitacion)}>Reservar ahora</button>
              </div>
            </div>
            <div className="sub2">
              <div className="extras">Número de habitación {habitacion.numero_habitacion}</div>
              <img className="imgh" src={habitacion.img} alt={habitacion.tipo} />
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Habitaciones;
