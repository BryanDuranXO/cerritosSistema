package mx.edu.utez.CerritosBack.controller.Personas.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class PersonaDTO {
    private Long id;
    private String nombre;
    private String paterno;
    private String materno;
    private String correo;
    private String telefono;
    private String username;
    private String password;
    private String img;
    private RolBean rolBean;
    private ReservaBean reservaBean;

    public PersonaBean toEntity() {
        if (rolBean == null)
                return new PersonaBean(id, nombre, paterno, materno, correo, telefono, username, password, img);
            return new PersonaBean(nombre, paterno, materno, correo, telefono, username, password, img, rolBean, reservaBean);

    }



//    public PersonaBean toUpdate() {
//        if (rolBean == null)
//            return new PersonaBean(id, nombre, paterno, materno, correo, telefono, username, password, img);
//        return new PersonaBean(id, nombre, paterno, materno, correo, telefono, username, password, img, rolBean);
//    }

}
