import Footer from "../components/footer";
import CollapsibleExample from "../components/menu2";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import '../css/eventos.css'

const Eventos = () => {
    return(
        <>
            <CollapsibleExample/>

            <div className="etiqueta">
                Eventos Sociales
            </div>

            <div className="main-container">
                <div className="contEvt">
                    <div className="itemvt">
                        <p className="tittleEv">Eventos Sociales</p>
                        <p className="info">
                            Nuestros espacios para eventos están conformados de bellos jardines, lagos con vegetación exótica y maravillosas vistas, sin duda la mejor opción para usted y sus invitados.
                            Jardín con un concepto de servicios integrales para eventos sociales, corporativos y empresariales.
                        </p>
                        <p className="info">
                            Los espacios están diseñados para adaptarse a cualquier tipo de evento, ya sea una boda elegante, una fiesta de cumpleaños vibrante, o un evento corporativo sofisticado.
                            Nuestra ubicación es de fácil acceso para la comodidad de sus invitados. Permítanos ser parte de sus momentos más especiales, asegurando que cada evento sea único y memorable.
                        </p>
                    </div>

                    <div className="itemvt2">
                        <img className="imagenEvt" src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg" alt="img" />
                    </div>
                </div>

                <p className="tittleEv">Eventos Comunes</p>

                <div className="slide">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Img1-ph8l6bg4onugdzk4xihwya3qlkspnqstucsga4c0aw.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>

                    <div className="form">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="Password"

                            />
                            <label htmlFor="floatingInputCustom">Nombre completo</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Correo electrónico</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Télefono</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Fecha de evento</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Tipo de evento</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Número de invitados</label>
                        </Form.Floating>
                    </div>
                </div>
            </div>


            <div className="main-container">
                <div className="contEvt">
                    
                </div>

            </div>
            

            <Footer/>
        </>
    );
}

export default Eventos;