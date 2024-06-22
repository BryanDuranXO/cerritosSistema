package mx.edu.utez.CerritosBack.controller.Personas;

import com.fasterxml.jackson.core.PrettyPrinter;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Personas.DTO.PersonaDTO;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.service.Persona.PersonaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cerritos/persona")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PersonaController {

    private final PersonaService personaService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(personaService.getAllPeople(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> savePerson(@RequestBody PersonaDTO personaDTO){
        return personaService.savePerson(personaDTO.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePerson(@PathVariable("id") Long id, @RequestBody PersonaDTO dto){
        dto.setId(id);
        return personaService.updatePerson(dto.toUpdate());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse>deletePerson(@PathVariable("id") Long id){
        return personaService.deletePerson(id);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody PersonaDTO dto){
        return personaService.login(dto.getUsername(), dto.getPassword());
    }
}
