import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Form from './form.jsx';
import { Inicio } from './screens/inicio.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Habitaciones from './screens/Habitaciones.jsx';
import Eventos from './screens/eventos.jsx';
import Contacto from './screens/contacto.jsx';
import Login from './screens/login.jsx';
import NavAdmin from './screens/Agenda.jsx';
import Usuarios from './screens/usuarios.jsx';
import HabAdmin from './screens/habitacionesAdmin.jsx';
import Perfil from './screens/perfil.jsx';
import Reservas from './screens/reservas.jsx';
import MainUser from './screens/UserDetalles.jsx';
import PerfilUser from './screens/PerfilUser.jsx';
import Busqueda from './screens/Busqueda.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/Inicio' element={<Inicio />} />
      <Route path='/form-PDF' element={<Form />} />
      <Route path='/Habitaciones' element= {<Habitaciones/>}/>
      <Route path='/Eventos' element= {<Eventos/>} />
      <Route path='Contacto' element= {<Contacto/>} />
      <Route path='/Acceso' element={<Login/>} />
      <Route path='/ReservacionAdmin' element={<NavAdmin/>} />
      <Route path='/Usuarios' element={<Usuarios/>} />
      <Route path='/HabitacionesAdmin' element={<HabAdmin/>} />
      <Route path='/Busqueda' element={<Busqueda/>} />
      <Route path='/Perfil' element={<Perfil/>}/>
      <Route path='/*' element={<Inicio />} />
      <Route path="/reservacion" element={<Reservas/>} />
      <Route path='/UserVista' element={<MainUser/>} />
      <Route path='UserProfile' element={<PerfilUser/>}/>
    </Routes>
  </Router>
);
