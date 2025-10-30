package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "zona")
@Data
public class Zona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	@Column(name = "codigo_postal")
	private String codigoPostal;
}
