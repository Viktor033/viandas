package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(nullable = false)
    private Boolean activo = true;

    /**
     * Día de la semana al que pertenece este producto: Lunes, Martes, Miércoles,
     * Jueves, Viernes, Todos
     */
    @Column
    private String dia = "Todos";
}
