package mx.edu.utez.CerritosBack.model.personas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50)
    private String nombre;
    @Column(length = 50)
    private String paterno;
    @Column(length = 50)
    private String materno;
    @Column(length = 50)
    private String correo;
    @Column(length = 10)
    private String telefono;
    @Column(length = 50)
    private String username;

    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private Boolean estatus;

    @Column(columnDefinition = "TEXT")

    private String password;
    @Column(length = 250)
    private String img;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_rol")
    private RolBean rolBean;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_reserva")
    private ReservaBean reservaBean;

    public PersonaBean(Long id, String nombre, String paterno, String materno, String correo, String telefono, String username, String password, String img) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.password = password;
        this.img = img;
    }
    public PersonaBean(String nombre, String paterno, String materno, String correo, String telefono, String username, String password, String img, RolBean rolBean) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.password = password;
        this.img = img;
        this.rolBean = rolBean;
    }


    public PersonaBean(Long id, String nombre, String paterno, String materno, String correo, String telefono, String username, Boolean estatus, String password, String img, RolBean rolBean) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.estatus = estatus;
        this.password = password;
        this.img = img;
        this.rolBean = rolBean;
    }

    public PersonaBean(String nombre, String paterno, String materno, String correo, String telefono, String username, Boolean estatus, String password, String img, RolBean rolBean, ReservaBean reservaBean) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.estatus = estatus;
        this.password = password;
        this.img = img;
        this.rolBean = rolBean;
        this.reservaBean = reservaBean;
    }


    public PersonaBean(String nombre, String paterno, String materno, String correo, String telefono, String username, String password, String img, RolBean rolBean, ReservaBean reservaBean) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.password = password;
        this.img = img;
        this.rolBean = rolBean;
        this.reservaBean = reservaBean;
    }


}
