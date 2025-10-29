package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	private String email;

	@Column(unique = true, nullable = false)
	private String telefono;

	private String contraseña;

	private String rol;
}
