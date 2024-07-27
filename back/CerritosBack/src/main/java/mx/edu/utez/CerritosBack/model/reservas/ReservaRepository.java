package mx.edu.utez.CerritosBack.model.reservas;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<ReservaBean, Long> {

    Optional<ReservaBean>findById(Long id);
    Optional<ReservaBean>findByContrato(String contrato);



}
