package mx.edu.utez.CerritosBack.controller.Personas;

import com.fasterxml.jackson.core.PrettyPrinter;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.controller.Personas.DTO.PersonaDTO;
import mx.edu.utez.CerritosBack.controller.Reservas.DTO.ReservaDTO;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.service.Persona.PersonaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.util.Date;

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

    @GetMapping("/{telefono}")
    public ResponseEntity<ApiResponse> getOne(@PathVariable String telefono){
        return new ResponseEntity<>(new ApiResponse(personaService.getOnePeople(telefono), HttpStatus.OK, "ok"), HttpStatus.OK);
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

    @GetMapping("/qrcode")
    public void generateQRCode(HttpServletResponse response,
                               @RequestBody ReservaDTO reservaDTO,
                               @RequestParam(defaultValue = "350") int width,
                               @RequestParam(defaultValue = "350") int height) throws Exception {
        // Obtener la fecha actual
        String date = java.time.LocalDate.now().toString();

        String IDC = reservaDTO.getContrato();
        Date llegada = reservaDTO.getFecha_entrada();
        Date salida = reservaDTO.getFecha_salida();


        // Formatear los datos en una sola cadena
        String text = String.format("ID: %s\nFecha de llegada: %s\nFecha de salida: %s", IDC, llegada, salida);

        // Generar el código QR
        BufferedImage image = personaService.generateQRCode(text, width, height);
        ServletOutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, "png", outputStream);
        outputStream.flush();
        outputStream.close();
    }
}
