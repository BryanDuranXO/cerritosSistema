import React from "react";
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Cerritos from '../assets/logocerritos.png'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    <img className="imagenFooter" src={Cerritos}></img>
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} Cerritos Xochitepec. Todos los derechos reservados.
                    </span>
                </div>
                <a
                    href="mailto:cerritosxochitepec2022@gmail.com"
                    target="_blank"
                    className="item3"
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a
                    href="https://www.facebook.com/cerritosxochitepec?mibextid=ZbWKwL"
                    target="_blank"
                    className="item4"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                    href="https://www.instagram.com/cerritosxochitepec?igsh=MTZubTNrbDNuY3g1MQ"
                    target="_blank"
                    className="item5"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>

            </div>
        </footer>
    );
};

export default Footer;