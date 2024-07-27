package mx.edu.utez.CerritosBack.controller.Reservas.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesBean;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;

import java.time.LocalTime;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
public class ReservaDTO {

    private Long id;

    private Date fecha_entrada;

    private Date fecha_salida;

    private LocalTime hora_entrada;

    private LocalTime hora_salida;

    private String contrato;

    private Boolean estado;

    private HabitacionesBean habitacionesBean;

    private Set<PersonaBean> personaBeanSet;

    public ReservaBean toEntity(){
        return new ReservaBean(fecha_entrada, fecha_salida, hora_entrada, hora_salida, contrato, estado, habitacionesBean);
    }
}

