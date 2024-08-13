package mx.edu.utez.CerritosBack.service.Reserva;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesRepository;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

                    @Service
                    @Transactional
@AllArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final HabitacionesRepository habitacionesRepository;
    private JavaMailSender mailSender;


    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllReservas (){
        return new ResponseEntity<>(new ApiResponse(reservaRepository.findAll(),
                HttpStatus.OK,
                "todo bien"),
                HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> GetOneContrato(String contrato){
        return new ResponseEntity<>(new ApiResponse(reservaRepository.findByContrato(contrato),
                HttpStatus.OK, "ok"),
                HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> Cancelacion(Long id){
        Optional<ReservaBean> foundReserva = reservaRepository.findById(id);

        if(foundReserva.isPresent()){
            ReservaBean reserva = foundReserva.get();
            reserva.setEstado(false);
            return new ResponseEntity<>(new ApiResponse(reservaRepository.save(reserva),
                    HttpStatus.OK, "Reserva Cancelada"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND,
                true, "Reserva no encontrada"),
                HttpStatus.NOT_FOUND);
    }

    // aqui viene lo perro
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveReserva(ReservaBean reservaBean) {

        LocalDate llegada = reservaBean.getFecha_entrada();
        LocalDate salida = reservaBean.getFecha_salida();

        if (llegada == null || salida == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST,
                    true,
                    "Las fechas de llegada y salida no pueden ser nulas"),
                    HttpStatus.BAD_REQUEST);
        }

        if (llegada.isAfter(salida)) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST,
                    true, "La fecha de llegada no puede ser después de la de salida"),
                    HttpStatus.BAD_REQUEST);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String llegadaFormatted = llegada.format(formatter);
        String salidaFormatted = salida.format(formatter);

        Optional<ReservaBean> reservasExistentes = habitacionesRepository.findReservationsByRoomNumberAndDates(
                reservaBean.getHabitacionesBean().getNumero_habitacion(),
                llegada,
                salida);

        if (reservasExistentes.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST,
                    true, "La habitación se encuentra reservada en las fechas indicadas"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(reservaRepository.saveAndFlush(reservaBean),
                HttpStatus.OK, "Reserva realizada con éxito"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void correoEventos(String nombre, String tipo, String telefono, String correoE, String fecha, String total) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        String correo = "alexisduranduran105@gmail.com";

        helper.setTo(correo);
        helper.setFrom("cerritosxochitepecmail@gmail.com");
        helper.setSubject("¡Reserva Exitosa!");

        String htmlContent = "<h1 style='color: #007bff;'>¡Hola!</h1>"
                + "<h3'>Se notifica la cotización de un evento!.</h3>"
                + "<p style='font-weight: bold;'>¡Esperamos que estés bien! comunicate con esta persona:</p>"
                + "<p style='font-weight: bold;'>¡Esperamos que estés bien! comunicate con esta persona:</p>"
                +"<p style='font-weight: bold;'>Nombre:</p> <p>" + nombre +"</p>"
                +"<p style='font-weight: bold;'>Tipo de evento:</p> <p>" + tipo +"</p>"
                +"<p style='font-weight: bold;'>Número de telefono:</p> <p>" + telefono +"</p>"
                +"<p style='font-weight: bold;'>Correo electrónico:</p> <p>" + correoE +"</p>"
                +"<p style='font-weight: bold;'>Fecha estimada:</p> <p>" + fecha +"</p>"
                +"<p style='font-weight: bold;'>Número estimado de invitados:</p> <p>" + total +"</p>"
                + "<img src='https://cerritosxochitepec.com/wp-content/uploads/2021/12/Logo2-180.png' alt='Logo Cerritos Xochitepec'>";

        helper.setText(htmlContent, true);

        mailSender.send(message);

    }
}
