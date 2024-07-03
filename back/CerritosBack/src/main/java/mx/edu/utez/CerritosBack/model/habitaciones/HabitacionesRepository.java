package mx.edu.utez.CerritosBack.model.habitaciones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HabitacionesRepository extends JpaRepository<HabitacionesBean, Long> {
    Optional<HabitacionesBean> findByTipo (String tipo);

    Optional<HabitacionesBean> findById(Long id);
}
