package mx.edu.utez.CerritosBack.service.Persona;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.personas.PersonaRepository;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaRepository;
import mx.edu.utez.CerritosBack.model.rol.RolBean;
import mx.edu.utez.CerritosBack.model.rol.RolRepository;
import mx.edu.utez.CerritosBack.security.MainSecurity;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor

public class PersonaService {

    private final PersonaRepository personaRepository;
    private final RolRepository rolRepository;
    private final ReservaRepository reservaRepository;
    private JavaMailSender mailSender;

    private PasswordEncoder passwordEncoder;

    private final MainSecurity pass; // Inyecta el servicio de encriptación de contraseñas

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllPeople(){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOnePeople(String telefono){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findByTelefono(telefono), HttpStatus.OK, "ok"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> updatePerson(PersonaBean personaBean) {
        if (personaBean.getRolBean() == null || personaBean.getRolBean().getId() == null)
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);

        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getId());
        if (foundRol.isEmpty())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);

        Optional<PersonaBean> existingPersonOptional = personaRepository.findById(personaBean.getId());
        if (existingPersonOptional.isPresent()) {
            personaBean.setRolBean(foundRol.get());
            return new ResponseEntity<>(new ApiResponse(personaRepository.save(personaBean), HttpStatus.OK, "todo correcto"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> deletePerson(Long id) {
        Optional<PersonaBean> foundPerson = personaRepository.findById(id);

        if (foundPerson.isPresent()) {
            personaRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Persona eliminada con éxito"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> savePerson(PersonaBean personaBean) {
        if (personaBean.getNombre() == null || personaBean.getNombre().isEmpty() || personaBean.getNombre().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre es obligatorio y no puede estar vacío."), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getPaterno() == null || personaBean.getPaterno().isEmpty() || personaBean.getPaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Paterno es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getMaterno() == null || personaBean.getMaterno().isEmpty() || personaBean.getMaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Materno es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getCorreo() == null || personaBean.getCorreo().isEmpty() || personaBean.getCorreo().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El correo es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }



        if (personaBean.getTelefono() == null || personaBean.getTelefono().isEmpty() || personaBean.getTelefono().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El número telefónico es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getRolBean() == null || personaBean.getRolBean().getId() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);
        }

        // Verificación del rol
        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getId());
        if (!foundRol.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setRolBean(foundRol.get());

        // Verificación de la reserva
        if (personaBean.getReservaBean() == null || personaBean.getReservaBean().getId() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar una reserva válida"), HttpStatus.BAD_REQUEST);
        }

        Optional<ReservaBean> foundReserva = reservaRepository.findById(personaBean.getReservaBean().getId());
        if (!foundReserva.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La reserva proporcionada no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setReservaBean(foundReserva.get());

        String encrypted = passwordEncoder.encode(personaBean.getPassword());
        personaBean.setPassword(encrypted);

        personaRepository.saveAndFlush(personaBean);

        try {
            enviarCorreo(personaBean.getCorreo(), personaBean.getReservaBean().getContrato(), personaBean.getReservaBean().getFecha_entrada(), personaBean.getReservaBean().getFecha_salida());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, "Error al enviar el correo"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ApiResponse(personaBean, HttpStatus.OK, "Guardado exitosamente"), HttpStatus.OK);
    }


    //login generico

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> login(String user, String pass){
        Optional persona = personaRepository.findByUsername(user);

        if(persona.isPresent()){
            PersonaBean personaLogin = (PersonaBean) persona.get();

            if(personaLogin.getPassword().equals(pass)){
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Bienvenido"), HttpStatus.OK);
            }

            return new ResponseEntity<>(new ApiResponse(HttpStatus.UNAUTHORIZED, true, "No encontrado"), HttpStatus.UNAUTHORIZED);

        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.UNAUTHORIZED, false, "nel"), HttpStatus.UNAUTHORIZED);

    }

    public void enviarCorreo(String correo, String contrato, LocalDate llegada, LocalDate salida)
            throws Exception, WriterException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(correo);
        helper.setFrom("cerritosxochitepecmail@gmail.com");
        helper.setSubject("¡Reserva Exitosa!");

        String htmlContent = "<h1 style='color: #007bff;'>¡Hola!</h1>"
                + "<p style='font-weight: bold;'>¡Esperamos que estés bien!</p>"
                + "<p style='font-size: 18px;'>Este es un correo de parte de " +
                "Cerritos Xochitepec para darte un detalle sobre tu reserva.</p>"
                + "<p style='font-size: 18px;'>Fecha de llegada: " + llegada + "</p>"
                + "<p style='font-size: 18px;'>Fecha de salida: " + salida + "</p>"
                + "<p style='font-size: 18px;'>Contrato: " + contrato + "</p>"
                + "<p style='font-size: 18px;'>Adjunto encontrarás un código QR con la misma información.</p>"
                + "<img src='https://cerritosxochitepec.com/wp-content/uploads/2021/12/Logo2-180.png' alt='Logo" +
                " Cerritos Xochitepec'>";

        helper.setText(htmlContent, true);
        String qrText = String.format("ID: %s\nFecha de llegada: %s\nFecha de salida: %s", contrato, llegada, salida);
        BufferedImage qrImage = generateQRCode(qrText, 350, 350);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "png", baos);
        byte[] qrBytes = baos.toByteArray();

        helper.addAttachment("codigoQR.png", new ByteArrayResource(qrBytes));
        mailSender.send(message);
    }


    public BufferedImage generateQRCode(String text, int width, int height) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }



}
