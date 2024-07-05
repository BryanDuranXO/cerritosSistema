import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/eventos.css';

const Eventos = () => {
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
                            <div className="imagenEvt">
                                <img
                                    className="img-fluid"
                                    src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg"
                                    alt="Imagen de evento social"
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <div className="d-flex justify-content-center align-items-rigth  w-100">
                    <div className="w-50"> 
                        <p className="tittleEv">Eventos Comunes</p>

                        <Carousel className="slide" style={{marginLeft:"15%"}}> 
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
                            <Form className="form"> 
                                <Form.Group className="mb-3">
                                
                                    <Form.Control
                                        id="floatingInputCustom"
                                        type="text"
                                        placeholder="Nombre completo"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="email"
                                        placeholder="Correo electrónico"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="tel"
                                        placeholder="Teléfono"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                 
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="date"
                                        placeholder="Fecha de evento"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="text"
                                        placeholder="Tipo de evento"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                   
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="number"
                                        placeholder="Número de invitados"
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
