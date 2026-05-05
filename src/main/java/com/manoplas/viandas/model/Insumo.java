package com.manoplas.viandas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "insumos")
@Data
public class Insumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String cantidad;

    private Boolean comprado = false;
}
