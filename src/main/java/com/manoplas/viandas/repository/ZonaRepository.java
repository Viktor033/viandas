package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZonaRepository extends JpaRepository<Zona, Long> {

	// Buscar por nombre exacto
	List<Zona> findByNombre(String nombre);

	// Buscar por código postal
	List<Zona> findByCodigoPostal(String codigoPostal);
}
