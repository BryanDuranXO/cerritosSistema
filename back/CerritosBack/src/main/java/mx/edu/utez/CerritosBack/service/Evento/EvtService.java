package mx.edu.utez.CerritosBack.service.Evento;

import com.google.zxing.WriterException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
@AllArgsConstructor
public class EvtService {
    private JavaMailSender mailSender;


    public ResponseEntity<ApiResponse> CorreoEvento(String nombre, String correo, String telefono, LocalDate llegada, String evento, Integer invitados)
            throws Exception, WriterException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String mail = "alexisduranduran105@gmail.com";
        helper.setTo(mail);
        helper.setFrom("cerritosxochitepecmail@gmail.com");
        helper.setSubject("¡Reserva Exitosa!");

        String htmlContent = "<h1 style='color: #007bff;'>¡Hola!</h1>"
                + "<p style='font-weight: bold;'>¡Esperamos que estés bien!</p>"
                + "<p style='font-size: 18px;'>Este es un correo de parte de " +
                "Cerritos Xochitepec para notificarte una nueva cotización de evento.</p>"
                + "<p style='font-size: 18px;'>Tipo de evento: " + evento + "</p>"
                + "<p style='font-size: 18px;'>Fecha de llegada: " + llegada + "</p>"
                + "<p style='font-size: 18px;'>Número de invitados: " + invitados + "</p>"
                + "<p style='font-size: 18px;'>Solicitante: " + nombre + "</p>"
                + "<p style='font-size: 18px;'>télefono: " + telefono + "</p>"
                + "<p style='font-size: 18px;'>Correo: " + correo + "</p>"
                + "<p style='font-size: 18px;'>¡Comunicate con la persona para mas información!.</p>"
                + "<img src='https://cerritosxochitepec.com/wp-content/uploads/2021/12/Logo2-180.png' alt='Logo" +
                " Cerritos Xochitepec'>";

        helper.setText(htmlContent, true);
        mailSender.send(message);
        return null;
    }

}
