package mx.edu.utez.CerritosBack.model.habitaciones;

import mx.edu.utez.CerritosBack.model.reservas.ReservaBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface HabitacionesRepository extends JpaRepository<HabitacionesBean, Long> {
    Optional<HabitacionesBean> findByTipo (String tipo);
    Optional<HabitacionesBean> findById(Long id);

    @Query(value = "SELECT r FROM ReservaBean r " +
            "WHERE r.habitacionesBean.numero_habitacion = :numeroHabitacion " +
            "AND (r.fecha_entrada < :fechaSalida " +
            "AND r.fecha_salida > :fechaEntrada)")
    Optional<ReservaBean> findReservationsByRoomNumberAndDates(@Param("numeroHabitacion") int numeroHabitacion,
                                                           @Param("fechaEntrada") Date fechaEntrada,
                                                           @Param("fechaSalida") Date fechaSalida);

}
