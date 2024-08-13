import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/perfil.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";  
import Form from 'react-bootstrap/Form';

function Perfil() {
    const navigate = useNavigate();

    const personaLogin = JSON.parse(localStorage.getItem("persona"));

  const personaSesion = {
    nombre : personaLogin.body.data.nombre,
    materno : personaLogin.body.data.materno,
    paterno : personaLogin.body.data.paterno,
    correo: personaLogin.body.data.correo,
    telefono: personaLogin.body.data.telefono,
    username: personaLogin.body.data.username,
    estatus: personaLogin.body.data.estatus,
  }

  const estatusTexto = personaSesion.estatus ? 'Activo' : 'Inactivo';

  
    return (
      <div className="contNav">
        <div className="side">
          <div className="imgag">
            <img className='logo' src={cerritos} alt="logo" />
          </div>
          <div className="subM2"></div>
          <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
          <div onClick={() => { navigate('/Busqueda') }} className="subM">Busqueda Rapida</div>
          <div onClick={() => { navigate('/Usuarios') }} className="subM">Usuarios</div>
          <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Habitaciones</div>
          <div onClick={() => { navigate('/Perfil') }} className="subM">Perfil</div>
        </div>
  
        <div className="main">
          <div className="nav">
            <div className="nv">
              <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />{}
              <button className='butSal' onClick={() => { navigate('/Acceso') }}>Cerrar sesión</button>
            </div>
          </div>
  
          <div className="content">
  
            <div className="users">
              <div className="cabezera">Información personal</div>
  
              <div className="infor">
  
                <div className="contenidoft">
                  <img className='fotouser' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />
                  <p style={{ color: '#2E3B4C' }} className="fs-3 fw-semibold">{personaSesion.nombre} {personaSesion.materno} {personaSesion.paterno}</p>
                  <p style={{ color: '#6B7381' }} className="fs-4 fw-semibold">{personaSesion.estatus}</p>
                  <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">{personaSesion.correo}</p>
  
                </div>
  
                <div className="contenido">
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Número télefonico:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">{personaSesion.telefono}</p>
  
                  </div>
  
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Nombre de usuario:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">{personaSesion.username}</p>
  
                  </div>
  
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Estatus de cuenta:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">{estatusTexto}</p>
  
                  </div>
                </div>
  
              </div>
  
            </div>
  
            <div className="pass">
              <div className="cabezera2">Reestablecer contraseña</div>
  
              <div className="contPass">
                <form className="password-form">
                  <div className="form-group">
                    <label htmlFor="oldPassword">Nueva contraseña</label>
                    <input type="password" id="oldPassword" name="oldPassword" />
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="newPassword">Confirmar Contraseña</label>
                    <input type="password" id="newPassword" name="newPassword" />
                  </div>
  
                  <div className="form-group">
                    <button type="submit">Reestablecer</button>
                  </div>
                </form>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Perfil;
  