package mx.edu.utez.CerritosBack.controller.Habitaciones;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.service.Habitaciones.HabitacionesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cerritos/habitaciones")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class HabitacionesController {
    private final HabitacionesService habitacionesService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> AllHabitaciones(){
        return habitacionesService.getAllHabitaciones();
    }
}
