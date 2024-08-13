package mx.edu.utez.CerritosBack.controller.evt.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.CerritosBack.model.evt.Eventos;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class EvtDTO {

    private String nombre;
    private String correo;
    private String telefono;
    LocalDate llegada;
    private String evento;
    private Integer invitados;

    public Eventos toEntity(){
        return new Eventos(nombre, correo, telefono, llegada, evento, invitados);
    }
}
