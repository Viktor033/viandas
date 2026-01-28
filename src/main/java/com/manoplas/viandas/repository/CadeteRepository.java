package com.manoplas.viandas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.manoplas.viandas.model.Cadete;

public interface CadeteRepository extends JpaRepository<Cadete, Long> {
}
