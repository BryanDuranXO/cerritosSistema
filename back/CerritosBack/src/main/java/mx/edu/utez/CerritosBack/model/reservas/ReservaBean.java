package mx.edu.utez.CerritosBack.model.reservas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.CerritosBack.model.habitaciones.HabitacionesBean;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "DATE", nullable = false)
    private Date fecha_entrada;

    @Column(columnDefinition = "DATE", nullable = false)
    private Date fecha_salida;

    @Column(columnDefinition = "TIME", nullable = false)
    private Date hora_entrada;

    @Column(columnDefinition = "TIME", nullable = false)
    private Date hora_salida;

    @Column(length = 10, nullable = false)
    private String id_contrato;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_habitacion")
    private HabitacionesBean habitacionesBean;




    @JsonIgnore
    @ManyToMany
    @JoinTable(name="personas_reservas",joinColumns = @JoinColumn(name="fk_id_reserva"),
            inverseJoinColumns =@JoinColumn(name = "fk_id_persona") )
    Set <PersonaBean> personaBeanSet =new HashSet<>();

}
