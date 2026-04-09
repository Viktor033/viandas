package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Cadete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CadeteRepository extends JpaRepository<Cadete, Long> {

	// Filtra cadetes por zona asignada
	List<Cadete> findByZonaAsignada(String zonaAsignada);

	// Filtra cadetes por estado activo/inactivo
	List<Cadete> findByActivo(Boolean activo);
}
