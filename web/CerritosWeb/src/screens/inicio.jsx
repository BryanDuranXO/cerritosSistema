import CollapsibleExample from '../components/menu2';
import { Navegacion } from '../components/nav';
import '../css/inicio.css';
import '../css/style.css';
import { Fade } from "react-reveal";

export const Inicio = () => {
    return (
        <>
            <CollapsibleExample />
            <div className="main-container">
                <Fade left>
                    <div className="contenedor">
                        <div className="text-container">
                            <div className='texto'>
                                <p className='tittle'>Cerritos Xochitepec</p>
                            </div>
                            <div className="secondary-text">
                                <h3>Generando Momentos que recordarás toda la vida</h3>
                                <p className='info'>Estamos comprometidos a hacer de su visita un recuerdo atesorable, por lo que todo nuestro empeñoestará enfocado en personalizar nuestros servicios a sus necesidades y expectativas.</p>
                            </div>
                            <div className="boton">
                                <button>Reserva ahora</button>
                            </div>
                        </div>
                        <div className="imagen">
                            <img src={'https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg'} alt="img" />
                        </div>
                    </div>
                </Fade>

                <Fade right>
    <div className="hotel-imagenes-container">
        <div className="hotel">
            <div className="texto">
                <p className="tittle">Hotel</p>
                <p className="info">
                    ¿Buscas placer o negocios? Descubre el confort de nuestras villas con 18 habitaciones completamente equipadas. Disfruta de un descanso excepcional mientras contemplas nuestros extensos y encantadores jardines, llenos de historia y belleza.
                </p>
                <button className='btnHab'>Habitaciones</button>
            </div>
        </div>
        <div className="imagenes">
            <img src={'https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg'} alt="img" />
        </div>
    </div>
</Fade>

                <Fade right>
                    <div className="evt">
                        <div className="texto">
                            <p className="tittle">Eventos Sociales</p>
                            <p className="info">Nuestras instalaciones para eventos te brindan hermosos jardines, lagos con vegetación exótica y vistas impresionantes, ¡la elección perfecta para ti y tus invitados!</p>
                        </div>
                    </div>
                </Fade>
            </div>

            
            <Fade left>
    <div className="hotel-imagenes-container">
        <div className="hotel">
            <div className="texto">
                <p className="tittle">Espacios</p>
                <p className="info">
                Explora nuestros jardines amplios y exuberantes, tres piscinas con camastros, una cancha de tenis y un mini golf para disfrutar al máximo tu estadía.                </p>
                <button className='btnHab'>Habitaciones</button>
            </div>
        </div>
        <div className="imagenes">
            <img src={'https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg'} alt="img" />
        </div>
    </div>
</Fade>
        </>
    );
}
