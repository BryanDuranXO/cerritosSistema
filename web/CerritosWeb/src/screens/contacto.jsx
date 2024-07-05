import CollapsibleExample from "../components/menu2";
import Footer from "../components/footer";
import '../css/contacto.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from 'react-bootstrap/Carousel';
import {
    faYoutube,
    faGithub,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacto = () => {
    return (
        <>
            <CollapsibleExample />
            <div className="carousel-container">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../src/assets/foto1.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100" 
                            src="../src/assets/foto2.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../src/assets/foto3.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="mainCont">
                <div className="contContac">
                    <p className="fs-4">Ubicación</p>
                    <p className="ubi">
                        Calle 5 de Mayo S / N, Colonia Lázaro Cárdenas, Chiconcuac en Xochitepec, Morelos, México. CP 62790
                    </p>

                    <p className="fs-4">Oficina</p>
                    <p>Teléfono: 777 109 53 55</p>
                    <p>Oficina: 777 947 03 71</p>

                    <p className="fs-4">Correo</p>
                    <p>cerritosxochitepec2022@gmail.com</p>

                    <p className="fs-4 fw-medium">Síguenos en nuestras redes sociales</p>
                    <div className="redes">
                        <a
                            href="mailto:cerritosxochitepec2022@gmail.com"
                            target="_blank"
                            className="itemRed"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                        <a
                            href="https://www.facebook.com/cerritosxochitepec?mibextid=ZbWKwL"
                            target="_blank"
                            className="itemRed"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a
                            href="https://www.instagram.com/cerritosxochitepec?igsh=MTZubTNrbDNuY3g1MQ"
                            target="_blank"
                            className="itemRed"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>

                <div className="contForm">
                    <p className="fs-4">Danos tus dudas y comentarios</p>

                    <form className="formCont">
                        <div className="mb-3">
                            <label htmlFor="Nombre" className="form-label">Nombre completo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Nombre"
                                id="Nombre"
                                placeholder="Ingresa tu nombre completo"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                name="correo"
                                id="correo"
                                placeholder="Ingresa tu correo electrónico"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tel" className="form-label">Número de teléfono</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="tel"
                                id="tel"
                                placeholder="Ingresa tu número de teléfono"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="coments" className="form-label">Comentarios</label>
                            <textarea
                                className="form-control"
                                name="coments"
                                id="coments"
                                rows="5"
                                placeholder="Escribe tus comentarios aquí"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contacto;
