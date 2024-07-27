package mx.edu.utez.CerritosBack.service.Reserva;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesRepository;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final HabitacionesRepository habitacionesRepository;


    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllReservas (){
        return new ResponseEntity<>(new ApiResponse(reservaRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> GetOneContrato(String contrato){
        return new ResponseEntity<>(new ApiResponse(reservaRepository.findByContrato(contrato), HttpStatus.OK, "ok"), HttpStatus.OK);
    }
    // aqui viene lo perro
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveReserva(ReservaBean reservaBean) {

        Date llegada = reservaBean.getFecha_entrada();
        Date salida = reservaBean.getFecha_salida();

        if (llegada == null || salida == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Las fechas de llegada y salida no pueden ser nulas"), HttpStatus.BAD_REQUEST);
        }

        if (llegada.after(salida)) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La fecha de llegada no puede ser después de la de salida"), HttpStatus.BAD_REQUEST);
        }

        // Convertir las fechas a formato yyyy-MM-dd
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String llegadaFormatted = dateFormat.format(llegada);
        String salidaFormatted = dateFormat.format(salida);

        // Aquí puedes imprimir las fechas para verificar el formato
        System.out.println("Fecha de llegada: " + llegadaFormatted);
        System.out.println("Fecha de salida: " + salidaFormatted);

        Optional<ReservaBean> reservasExistentes = habitacionesRepository.findReservationsByRoomNumberAndDates(
                reservaBean.getHabitacionesBean().getNumero_habitacion(),
                llegada,
                salida);

        if (reservasExistentes.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La habitación se encuentra reservada en las fechas indicadas"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(reservaRepository.saveAndFlush(reservaBean), HttpStatus.OK, "Reserva realizada con éxito"), HttpStatus.OK);
    }



}
