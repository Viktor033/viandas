package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vianda")
@Data
public class Vianda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	private String descripcion;

	private Double precio;
}
