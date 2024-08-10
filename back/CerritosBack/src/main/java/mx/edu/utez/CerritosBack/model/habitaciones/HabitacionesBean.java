package mx.edu.utez.CerritosBack.model.habitaciones;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;

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

    @Column(length = 250, nullable = false)
    private String img;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "habitacionesBean", fetch = FetchType.LAZY)
    private Set<ReservaBean> reservaBeans;

    public HabitacionesBean(String tipo, int capacidad, int numero_habitacion,
                            Double costo, Double extra, Boolean estado, String img, String desc) {
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.numero_habitacion = numero_habitacion;
        this.costo = costo;
        this.extra = extra;
        this.estado = estado;
        this.img = img;
    }

    public HabitacionesBean(Long id, String tipo, int capacidad, int numero_habitacion,
                            Double costo, Double extra, Boolean estado, String img, String descripcion) {
        this.id = id;
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.numero_habitacion = numero_habitacion;
        this.costo = costo;
        this.extra = extra;
        this.estado = estado;
        this.img = img;
        this.descripcion = descripcion;
    }
}
