package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Pedido;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

	Page<Pedido> findByEstado(String estado, Pageable pageable);

	Page<Pedido> findByZonaId(Long zonaId, Pageable pageable);

	Page<Pedido> findByFecha(LocalDate fecha, Pageable pageable);
}
