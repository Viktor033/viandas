package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "cadetes")
@Data
public class Cadete {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;
	private String apellido;
	private String dni;
	private String telefono;

	@Column(name = "zona_asignada")
	private String zonaAsignada;

	private Boolean activo;

	@Column(name = "fecha_ingreso")
	private LocalDate fechaIngreso;

	private String observaciones;
}

