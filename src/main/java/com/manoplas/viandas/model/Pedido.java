package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "pedido")
@Data
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate fecha;

	private String estado;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "zona_id")
	private Zona zona;

	@ManyToOne
	@JoinColumn(name = "cadete_id")
	private Cadete cadete;
}
