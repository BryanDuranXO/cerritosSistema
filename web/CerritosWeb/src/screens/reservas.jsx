import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import CollapsibleExample from '../components/menu2';
import '../css/reservacionForm.css'; 

const Reservas = () => {
  

  return (
    <>
      <CollapsibleExample/>
      
      <div className="reservas-container d-flex justify-content-center align-items-center mt-5">
        <Card>
          <Card.Header as="h2">Reserva de Habitación</Card.Header>
          <Card.Body>
            <Form >
              <Form.Group controlId="formCheckInDate">
                <Form.Label>Fecha de Llegada:</Form.Label>
                <Form.Control type="date" name="checkInDate" />
              </Form.Group>

              <Form.Group controlId="formCheckInTime">
                <Form.Label>Hora de Entrada:</Form.Label>
                <Form.Control type="time" name="checkInTime" />
              </Form.Group>

              <Form.Group controlId="formCheckOutDate">
                <Form.Label>Fecha de Salida:</Form.Label>
                <Form.Control type="date" name="checkOutDate"/>
              </Form.Group>

              <Form.Group controlId="formCheckOutTime">
                <Form.Label>Hora de Salida:</Form.Label>
                <Form.Control type="time" name="checkOutTime" />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">Reservar</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Reservas;
