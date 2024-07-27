package mx.edu.utez.CerritosBack.model.rol;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<RolBean, Long> {


}
