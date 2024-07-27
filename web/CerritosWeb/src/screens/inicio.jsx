import React from 'react';
import { Fade } from "react-awesome-reveal";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import CollapsibleExample from '../components/menu2';
import '../css/inicio.css';
import '../css/style.css';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

export const Inicio = () => {

    const navigate = useNavigate();

    return (
        <>
            <CollapsibleExample />
            <div className="main-container">
                
                <div className="contenedor contenedor-con-fondo">
                    <div className="text-container">
                        <p className='tittle'>"Cerritos Xochitepec"</p>
                    
                    <div className="text-container">
                        <div className="secondary-text">
                            <h3 style={{color:"white",fontWeight:"bold", fontSize:"20px",alignItems:"center"}}>¡Generando Momentos que recordarás toda la vida!</h3>
                            <p className='info2'>
                                Estamos comprometidos a hacer de su visita un recuerdo atesorable, por lo que todo nuestro empeño estará enfocado en personalizar nuestros servicios a sus necesidades y expectativas.
                            </p>
                        </div>

                    
                </div>
                        <div className="boton">
                            <button onClick={() =>{navigate('/Habitaciones')}}>Reserva ahora</button>
                        </div>
                    </div>
                </div>

                

                <Fade direction="right">
                    <div className="contenedor">
                        <div className="text-container">
                            <div className='texto'>
                                <p className='tittle'>Sobre el Hotel</p>
                            </div>
                            <div className="secondary-text">
                                <h3>Disfruta de nuevas experiencias en nuestras instalaciones</h3>
                                <p className='info'>
                                    ¿Buscas placer o negocios? Descubre el confort de nuestras villas con 18 habitaciones completamente equipadas. Disfruta de un descanso excepcional mientras contemplas nuestros extensos y encantadores jardines, llenos de historia y belleza.
                                </p>
                            </div>
                            <div className="boton2">
                                <button onClick={() => {navigate('/Habitaciones')}}>Habitaciones</button>
                            </div>
                        </div>
                        <div className="imagen">
                            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
                                <div>
                                    <img src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg" alt="img1" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="../src/assets/foto5.jpg" alt="img1" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="../src/assets/foto6.jpg" alt="img2" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </Fade>

                <Fade direction="left">
                    <div className="contenedor">
                        <div className="text-container">
                            <div className='texto'>
                                <p className='tittle'>Eventos Sociales</p>
                            </div>
                            <div className="secondary-text">
                                <h3>Goza al máximo tus reuniones en nuestro establecimiento</h3>
                                <p className='info'>
                                    Nuestras instalaciones para eventos te brindan hermosos jardines, lagos con vegetación exótica y vistas impresionantes, ¡la elección perfecta para ti y tus invitados!
                                </p>
                            </div>
                            <div className="boton2">
                                <button onClick={() => {navigate('/Eventos')}}>Cotiza tu evento</button>
                            </div>
                        </div>
                        <div className="imagen">
                            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
                                <div>
                                    <img src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Img5.jpg" alt="img1" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="../src/assets/foto9.jpg" alt="img2" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home2.jpg" alt="img2" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </Fade>

                <Fade direction="right">
                    <div className="contenedor">
                        <div className="text-container">
                            <div className='texto'>
                                <p className='tittle'>Nuestros Espacios</p>
                            </div>
                            <div className="secondary-text">
                                <h3>Disfruta de nuestras áreas verdes y espacios de entretenimiento</h3>
                                <p className='info'>
                                    Descubre nuestros amplios jardines y sumérgete en la tranquilidad que ofrecen. Relájate en una de nuestras tres piscinas rodeadas de cómodos camastros. Para los amantes del deporte, contamos con una cancha de tenis y un mini golf para disfrutar al máximo tu estancia.
                                </p>
                            </div>
                            <div className="boton2">
                                <button onClick={() =>{navigate('/Habitaciones')}}>Reserva ahora</button>
                            </div>
                        </div>
                        <div className="imagen">
                            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
                                <div>
                                    <img src="../src/assets/foto5.jpg" alt="img1" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="../src/assets/foto6.jpg" alt="img2" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                </div>
                                <div>
                                    <img src="https://cerritosxochitepec.com/wp-content/uploads/elementor/thumbs/Gale9-ph2zqdwn3abm5fcmlpjowiwiiiz1wqkzvutb76a1da.jpg" alt="img3" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                                </div>
                                <div>
                                    <img src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Gale14.jpg" alt="img3" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </Fade>
            </div>
            <Footer/>
        </>
    );
}
