import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiado para importar BrowserRouter como Router
import { Navegacion } from './components/nav.jsx';
import Form from './form.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/Inicio' element={<Navegacion />} />
      <Route path='/form-PDF' element={<Form />} />
      <Route path='/*' element={<Navegacion />} />
    </Routes>
  </Router>
);
