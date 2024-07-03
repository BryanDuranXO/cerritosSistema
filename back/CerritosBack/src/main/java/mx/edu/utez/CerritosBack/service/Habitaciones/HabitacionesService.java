package mx.edu.utez.CerritosBack.service.Habitaciones;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesBean;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class HabitacionesService {
    private final HabitacionesRepository habitacionesRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllHabitaciones(){
        return new ResponseEntity<>(new ApiResponse(habitacionesRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> AgregarHabitacion(HabitacionesBean habitacionesBean) {
        String tipoHabitacion = habitacionesBean.getTipo().toLowerCase();

        // Verificar si ya existe una habitación con ese tipo
        Optional<HabitacionesBean> habitacionExistente = habitacionesRepository.findByTipo(tipoHabitacion);
        if (habitacionExistente.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Tipo de habitación duplicado"), HttpStatus.BAD_REQUEST);
        }
            HabitacionesBean habitacionGuardada = habitacionesRepository.saveAndFlush(habitacionesBean);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Habitación agregada correctamente"), HttpStatus.OK);

    }

    //update queda pendiente
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> ActualizarHabitaciones(Long id, HabitacionesBean habitacionesBean){
        Optional<HabitacionesBean> foundId = habitacionesRepository.findById(id);
        if (foundId.isPresent()){
            HabitacionesBean encontrado = foundId.get();
            encontrado.setCapacidad(habitacionesBean.getCapacidad());
            encontrado.setCosto(habitacionesBean.getCosto());
            encontrado.setEstado(habitacionesBean.getEstado());
            encontrado.setExtra(habitacionesBean.getExtra());
            encontrado.setNumero_habitacion(habitacionesBean.getNumero_habitacion());
            encontrado.setTipo(habitacionesBean.getTipo());
            encontrado.setImg(habitacionesBean.getImg());
            return new ResponseEntity<>(new ApiResponse(habitacionesRepository.save(encontrado), HttpStatus.OK, "actualizado exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND,true, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> DeshabilitarHabitacion(Long id){
        Optional<HabitacionesBean> foundHabitacion = habitacionesRepository.findById(id);

        if (foundHabitacion.isPresent()){
            HabitacionesBean encontrado = foundHabitacion.get();
            if (encontrado.getEstado() == true){
                encontrado.setEstado(false);
                return new ResponseEntity<>(new ApiResponse(habitacionesRepository.save(encontrado), HttpStatus.OK, "Deshabilitado correctamente"), HttpStatus.OK);
            } else {
                encontrado.setEstado(true);
                return new ResponseEntity<>(new ApiResponse(habitacionesRepository.save(encontrado), HttpStatus.OK, "Habilitado correctamente"), HttpStatus.OK);

            }
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Habotacion no encontrada"), HttpStatus.NOT_FOUND);

        }

    }

}
