package com.manoplas.viandas.dto;

import lombok.Data;

@Data
public class RegistroRequest {
	private String nombre;
	private String telefono;
	private String contraseña;
	private String rol;
}
