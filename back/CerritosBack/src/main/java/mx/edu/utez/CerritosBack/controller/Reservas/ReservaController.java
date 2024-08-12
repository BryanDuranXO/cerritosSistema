package mx.edu.utez.CerritosBack.controller.Reservas;

import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Reservas.DTO.ReservaDTO;
import mx.edu.utez.CerritosBack.service.Reserva.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/cerritos/reservas")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getReservas(){
        return  reservaService.getAllReservas();
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<ApiResponse> getReserva(@PathVariable String id){
        return new ResponseEntity<>(new ApiResponse(reservaService.GetOneContrato(id),
                HttpStatus.OK, "ok"), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> saveReservacion(@RequestBody ReservaDTO dto){
        return reservaService.saveReserva(dto.toEntity());

    }
    @PostMapping("/evt")
    public void sendMail (
            @RequestParam String nombre,
            @RequestParam String tipo,
            @RequestParam String tel,
            @RequestParam String correo,
            @RequestParam String fecha,
            @RequestParam String tot
    ) throws MessagingException {
        reservaService.correoEventos(nombre, tipo, tel, correo, fecha, tot);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> cancelar(@PathVariable Long id){
        return reservaService.Cancelacion(id);
    }
}
