package mx.edu.utez.CerritosBack.controller.Rol;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Rol.DTO.RolDTO;
import mx.edu.utez.CerritosBack.model.rol.RolBean;
import mx.edu.utez.CerritosBack.service.Rol.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin (origins = {"*"})
@RequestMapping ("/api/cerritos/rol")
@AllArgsConstructor
public class RolController {
    private final RolService service;

    @GetMapping ("/")
    public ResponseEntity<ApiResponse> findRoles(){
        return service.findAll();
    }

    /*@GetMapping("/{rol}")
    public ResponseEntity<ApiResponse> findRol(@PathVariable("rol") String rol){
        return service.finOne(rol);
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findRol(@PathVariable ("id") Long Idrol){
        return service.finOneId(Idrol);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> saveRol(@RequestBody RolDTO dto){
        return service.save(dto.toEntity());
    }


}
