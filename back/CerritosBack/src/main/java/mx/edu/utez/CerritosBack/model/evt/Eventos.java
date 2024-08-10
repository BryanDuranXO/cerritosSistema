package mx.edu.utez.CerritosBack.model.evt;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Eventos {

    private String nombre;
    private String correo;
    private String telefono;
    LocalDate llegada;
    private String evento;
    private Integer invitados;

    public Eventos(String nombre, String correl, String telefono, LocalDate llegada, String evento, Integer invitados) {
        this.nombre = nombre;
        this.correo = correl;
        this.telefono = telefono;
        this.llegada = llegada;
        this.evento = evento;
        this.invitados = invitados;
    }


}
