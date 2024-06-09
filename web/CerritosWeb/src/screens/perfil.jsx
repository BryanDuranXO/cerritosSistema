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
  
            <div className="users">
              <div className="cabezera">Información personal</div>
  
              <div className="infor">
  
                <div className="contenidoft">
                  <img className='fotouser' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />
                  <p style={{ color: '#2E3B4C' }} className="fs-3 fw-semibold">John Doe</p>
                  <p style={{ color: '#6B7381' }} className="fs-4 fw-semibold">Gerente</p>
                  <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">JohnDoe@gmail.com</p>
  
                </div>
  
                <div className="contenido">
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Número télefonico:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">777-622-2548</p>
  
                  </div>
  
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Nombre de usuario:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">John Doe</p>
  
                  </div>
  
                  <div className="infoUser">
                    <p style={{ color: '#2E3B4C', marginRight: '2%' }} className="fs-5 fw-bold">Fecha de nacimiento:</p>
                    <p style={{ color: '#6B7381' }} className="fs-5 fw-semibold">2004-11-14</p>
  
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
  