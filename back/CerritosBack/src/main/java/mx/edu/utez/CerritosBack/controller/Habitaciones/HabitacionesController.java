package mx.edu.utez.CerritosBack.controller.Habitaciones;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Habitaciones.DTO.HabitacionesDTO;
import mx.edu.utez.CerritosBack.service.Habitaciones.HabitacionesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cerritos/habitaciones")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class HabitacionesController {


    private final HabitacionesService habitacionesService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> AllHabitaciones(){
        return habitacionesService.getAllHabitaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> OneHabitacion(@PathVariable Long id){
        return habitacionesService.getOneHabitacion(id);
    }



    @PostMapping("/")
    public ResponseEntity<ApiResponse> NewHabitacion(@RequestBody HabitacionesDTO habitacionesDTO){
        return habitacionesService.AgregarHabitacion(habitacionesDTO.toEntity());
    }

    //habilitar o deshabilitar hbaitacion
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> ChangeStatus(@PathVariable Long id){
        return habitacionesService.DeshabilitarHabitacion(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> Actualizar(
            @PathVariable("id") Long id, @RequestBody HabitacionesDTO habitacionesDTO){
        return habitacionesService.ActualizarHabitaciones(id, habitacionesDTO.toEntity());
    }

//    @GetMapping("hab/{tipo}/{num}")
//    public ResponseEntity<ApiResponse> HabitacionTipo(@PathVariable("tipo") String tipo, @PathVariable("num") int num){
//        return habitacionesService.tipoNum(tipo, num);
//    }
}
