package mx.edu.utez.CerritosBack.service.Habitaciones;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class HabitacionesService {
    private final HabitacionesRepository habitacionesRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllHabitaciones(){
        return new ResponseEntity<>(new ApiResponse(habitacionesRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }
}
