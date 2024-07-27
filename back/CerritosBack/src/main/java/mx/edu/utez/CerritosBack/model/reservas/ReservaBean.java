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

import java.time.LocalTime;
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

    @Column(columnDefinition = "DATE")
    private Date fecha_entrada;

    @Column(columnDefinition = "DATE")
    private Date fecha_salida;

    @Column(columnDefinition = "TIME")
    private LocalTime hora_entrada;

    @Column(columnDefinition = "TIME")
    private LocalTime hora_salida;

    @Column(length = 10)
    private String contrato;

    @Column(nullable = false)
    private Boolean estado;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_habitacion")
    private HabitacionesBean habitacionesBean;

    @OneToMany(mappedBy = "reservaBean", fetch = FetchType.LAZY)
    private Set<PersonaBean> personaBeans;


    public ReservaBean(Date fecha_entrada, Date fecha_salida, LocalTime hora_entrada, LocalTime hora_salida, String contrato, Boolean estado, HabitacionesBean habitacionesBean) {
        this.fecha_entrada = fecha_entrada;
        this.fecha_salida = fecha_salida;
        this.hora_entrada = hora_entrada;
        this.hora_salida = hora_salida;
        this.contrato = contrato;
        this.estado = estado;
        this.habitacionesBean = habitacionesBean;
    }

    public ReservaBean(Date fecha_entrada, Date fecha_salida, String contrato) {
        this.fecha_entrada = fecha_entrada;
        this.fecha_salida = fecha_salida;
        this.contrato = contrato;
    }
}
