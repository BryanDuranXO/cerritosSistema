import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Form from './form.jsx';
import { Inicio } from './screens/inicio.jsx';
import { Navegacion } from './components/nav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Habitaciones from './screens/Habitaciones.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/Inicio' element={<Inicio />} />
      <Route path='/form-PDF' element={<Form />} />
      <Route path='/Habitaciones' element= {<Habitaciones/>}/>
      <Route path='/*' element={<Inicio />} />
    </Routes>
  </Router>
);
