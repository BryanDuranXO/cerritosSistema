package mx.edu.utez.CerritosBack.controller.Habitaciones.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesBean;

@Data
@NoArgsConstructor
public class HabitacionesDTO {
    private String tipo;

    private int capacidad;

    private int numero_habitacion;

    private Double costo;

    private Double extra;

    private Boolean estado;

    private String img;

    public HabitacionesBean toEntity(){
        return new HabitacionesBean(tipo,capacidad , numero_habitacion, costo, extra, estado, img);
    }
}
