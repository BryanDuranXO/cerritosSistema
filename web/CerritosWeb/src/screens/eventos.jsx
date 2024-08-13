import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/eventos.css';
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Eventos = () => {
    const URLReserva = "http://localhost:8080/api/cerritos/evt/";

    const [nom, setNom] = useState("");
    const [correo, setCorreo] = useState("");
    const [tel, setTel] = useState("");
    const [fecha, setFecha] = useState("");
    const [tipo, setTipo] = useState("");
    const [tot, setTot] = useState("");

    const cotizar = async (e) => {
        e.preventDefault(); // Prevenir el envío por defecto del formulario

        const evt = {
            nombre: nom,
            correo: correo,
            telefono: tel,
            llegada: fecha,
            evento: tipo,
            invitados: parseInt(tot) // Convertir a número
        }

        try {
            const response = await axios.post(URLReserva, evt);
            console.log('Respuesta:', response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Acción exitosa!',
                text: '¡Alguien de nuestro departamento se pondrá en contacto contigo!',
                timer: 2500
            });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    }

    return (
        <>
            <CollapsibleExample />

            <div className="main-container">
                <Card className="mb-4 card-bg">
                    <Card.Body>
                        <div className="contEvt d-flex">
                            <div className="itemvt flex-grow-1">
                                <Card.Title className="tittleEv2">Eventos Sociales</Card.Title>
                                <Card.Text className="info">
                                    Nuestros espacios para eventos están conformados de bellos jardines, lagos con vegetación exótica y maravillosas vistas, sin duda la mejor opción para usted y sus invitados.
                                    Jardín con un concepto de servicios integrales para eventos sociales, corporativos y empresariales.
                                </Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <div className="d-flex justify-content-center align-items-right w-100">
                    <div className="w-50"> 
                        <p className="tittleEv">Eventos Comunes</p>

                        <Carousel className="slide" style={{marginLeft:"15%"}}> 
                            <Carousel.Item >
                                <img
                                    className="d-block w-100"
                                    src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item >
                                <img
                                    className="d-block w-100"
                                    src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Img2.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Img6.jpg"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Img5.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    <Card className="w-50" style={{marginBottom:"1%"}}> 
                        <Card.Body>
                            <Card.Title className="tittleEv3">¡Reserva tu momento!</Card.Title>
                            <Form className="form" onSubmit={cotizar}> 
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingInputCustom"
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="tel"
                                        placeholder="Teléfono"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="date"
                                        placeholder="Fecha de evento"
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="text"
                                        placeholder="Tipo de evento"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="number"
                                        placeholder="Número de invitados"
                                        value={tot}
                                        onChange={(e) => setTot(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Eventos;
