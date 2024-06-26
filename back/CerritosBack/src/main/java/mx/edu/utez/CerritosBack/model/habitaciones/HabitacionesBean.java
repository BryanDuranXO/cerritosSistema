package mx.edu.utez.CerritosBack.model.habitaciones;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.CerritosBack.model.personas.PersonaBean;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import mx.edu.utez.CerritosBack.model.rol.RolBean;

import java.util.Set;

@Entity
@Table(name = "Habitaciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HabitacionesBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60, nullable = false)
    private String tipo;

    @Column(nullable = false)
    private int capacidad;

    @Column(nullable = false)
    private int numero_habitacion;

    @Column(nullable = false)
    private Double costo;

    @Column(nullable = false)
    private Double extra;

    @Column(nullable = false)
    private Boolean estado;

    @OneToMany(mappedBy = "habitacionesBean", fetch = FetchType.LAZY)
    private Set<ReservaBean> reservaBeans;


}
