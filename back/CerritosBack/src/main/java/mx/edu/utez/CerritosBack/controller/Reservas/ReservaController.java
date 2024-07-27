package mx.edu.utez.CerritosBack.controller.Reservas;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Reservas.DTO.ReservaDTO;
import mx.edu.utez.CerritosBack.service.Reserva.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.util.Date;

@RestController
@RequestMapping("/api/cerritos/reservas")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ReservaController {
    private final ReservaService reservaService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getReservas(){
        return  reservaService.getAllReservas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getContrato(@PathVariable String id){
        return new ResponseEntity<>(new ApiResponse(reservaService.GetOneContrato(id), HttpStatus.OK, "ok"), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> saveReservacion(@RequestBody ReservaDTO dto){
        return reservaService.saveReserva(dto.toEntity());

    }


}
