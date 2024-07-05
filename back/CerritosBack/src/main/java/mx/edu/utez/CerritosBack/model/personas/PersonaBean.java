package mx.edu.utez.CerritosBack.model.personas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

import java.util.Set;

@Entity
@Table(name = "personas")
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

    @Column(length = 50)
    private String password;

    @Column(length = 250)
    private String img;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_rol")
    private RolBean rolBean;

    @ManyToMany(mappedBy = "personaBeanSet")
    Set<ReservaBean> reservaBeans;

}
