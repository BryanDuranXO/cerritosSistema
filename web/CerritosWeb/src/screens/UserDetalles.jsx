import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import cerritos from "../assets/logocerritos.png";
import axios from "axios";
import "../css/user.css";
const MainUser = () => {
  const navigate = useNavigate();
  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className="logo" src={cerritos} alt="logo" />
        </div>
        <div className="subM2"></div>
        <div
          onClick={() => {
            navigate("/UserVista");
          }}
          className="subM"
        >
          Mis reservaciones
        </div>
        <div
          onClick={() => {
            navigate("/UserProfile");
          }}
          className="subM"
        >
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
            <button
              className="butSal"
              onClick={() => {
                navigate("/Acceso");
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="UserContPrinc">
            
              <div className="tituloPrinc">
              <h2>Detalles de mi reserva</h2>

              </div>
              <div className="detallesRes">
              <table id="example2" className="table text-nowrap mb-0 align-middle">
            <thead className="text-dark fs-4">
              <tr>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">#</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">ID reserva</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Habitación</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Fecha entrada</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Fecha salida</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Estado de reserva</h6>
                </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">ola</h6>
                  </td>
                  <td className="border-bottom-0">
                    <span className="fw-normal">ola</span>
                  </td>
                  <td className="border-bottom-0">
                    <span className="fw-normal">ola</span>
                  </td>
                  <td className="border-bottom-0">
                    <span className="fw-normal">ola</span>
                  </td>
                  <td className="border-bottom-0">
                    <span className="fw-normal">ola</span>
                  </td>
                  <td className="border-bottom-0">
                    <span className="fw-normal">ola</span>
                  </td>
                  <td className="border-bottom-0">
  <span className="fw-normal">
  </span>
</td>

                  <td className="border-bottom-0">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      style={{ marginRight: "5px" }}
                      //onClick={}
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      //onClick={}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              
            </tbody>
          </table>

              </div>

        </div>
      </div>
    </div>
  );
};

export default MainUser;
