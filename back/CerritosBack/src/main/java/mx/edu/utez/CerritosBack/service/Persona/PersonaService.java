package mx.edu.utez.CerritosBack.service.Persona;

import lombok.AllArgsConstructor;
import mx.edu.utez.CerritosBack.config.ApiResponse;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.personas.PersonaRepository;
import mx.edu.utez.CerritosBack.model.rol.RolBean;
import mx.edu.utez.CerritosBack.model.rol.RolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final RolRepository rolRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllPeople(){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> savePerson(PersonaBean personaBean) {

        if (personaBean.getNombre() == null || personaBean.getNombre().isEmpty() || personaBean.getNombre().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre es obligatorio y no puede estar vacío."), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getPaterno() == null || personaBean.getPaterno().isEmpty() || personaBean.getPaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Paterno es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getMaterno() == null || personaBean.getMaterno().isEmpty() || personaBean.getMaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Materno es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getCorreo() == null || personaBean.getCorreo().isEmpty() || personaBean.getCorreo().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El correo es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getUsername() == null || personaBean.getUsername().isEmpty() || personaBean.getUsername().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre de usuario es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getPassword() == null || personaBean.getPassword().isEmpty() || personaBean.getPassword().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La contraseña es obligatorio y no puede estar vacia"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getTelefono() == null || personaBean.getTelefono().isEmpty() || personaBean.getTelefono().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El numero telefonico es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getRolBean() == null || personaBean.getRolBean().getId() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol valido"), HttpStatus.BAD_REQUEST);
        }

        // Verificación del rol
        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getId());
        if (!foundRol.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setRolBean(foundRol.get());

        Optional<PersonaBean> foundPersona = personaRepository.findByTelefono(personaBean.getTelefono());
        if (foundPersona.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Ya existe una persona registrada con los mismos datos"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(personaRepository.saveAndFlush(personaBean), HttpStatus.OK, "Guardado exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> updatePerson(PersonaBean personaBean) {
        if (personaBean.getRolBean() == null || personaBean.getRolBean().getId() == null)
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);

        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getId());
        if (foundRol.isEmpty())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);

        Optional<PersonaBean> existingPersonOptional = personaRepository.findById(personaBean.getId());
        if (existingPersonOptional.isPresent()) {
            personaBean.setRolBean(foundRol.get());
            return new ResponseEntity<>(new ApiResponse(personaRepository.save(personaBean), HttpStatus.OK, "todo correcto"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> deletePerson(Long id) {
        Optional<PersonaBean> foundPerson = personaRepository.findById(id);

        if (foundPerson.isPresent()) {
            personaRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Persona eliminada con éxito"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
        }
    }



}
