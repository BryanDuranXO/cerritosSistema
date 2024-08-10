package mx.edu.utez.CerritosBack.controller.evt;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.evt.DTO.EvtDTO;
import mx.edu.utez.CerritosBack.model.evt.Eventos;
import mx.edu.utez.CerritosBack.service.Evento.EvtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/cerritos/evt")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class EvtController {

    private final EvtService service;

    @PostMapping("/")
    public ResponseEntity<ApiResponse> correo(@RequestBody EvtDTO eventosDto) throws Exception {
        Eventos eventos = eventosDto.toEntity();
        return service.CorreoEvento(eventos.getNombre(), eventos.getCorreo(), eventos.getTelefono(),
                eventos.getLlegada(), eventos.getEvento(), eventos.getInvitados());
    }
}
