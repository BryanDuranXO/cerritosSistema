package mx.edu.utez.CerritosBack.model.habitaciones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitacionesRepository extends JpaRepository<HabitacionesBean, Long> {
}
