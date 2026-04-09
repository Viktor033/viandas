package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Vianda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViandaRepository extends JpaRepository<Vianda, Long> {

	// Buscar por nombre exacto
	List<Vianda> findByNombre(String nombre);

	// Buscar por precio menor o igual
	List<Vianda> findByPrecioLessThanEqual(Double precio);
}
