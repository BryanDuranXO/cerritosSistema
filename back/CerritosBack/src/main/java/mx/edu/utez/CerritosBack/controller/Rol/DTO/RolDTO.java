package mx.edu.utez.CerritosBack.controller.Rol.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

@Data
@NoArgsConstructor
public class RolDTO {
    private Long idRol;

    private String rol;

    public RolBean toUpdate(){
        return new RolBean(idRol, rol);
    }

    public RolBean toEntity(){
        return new RolBean(rol);
    }
}
