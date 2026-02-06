package com.manoplas.viandas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.manoplas.viandas.model.Cadete;
import java.util.Optional;

public interface CadeteRepository extends JpaRepository<Cadete, Long> {
    Optional<Cadete> findByTelefono(String telefono);
}
