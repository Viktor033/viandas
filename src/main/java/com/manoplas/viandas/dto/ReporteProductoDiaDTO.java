package com.manoplas.viandas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReporteProductoDiaDTO {
    private String nombre;
    private Long cantidad;
    private Double subtotal;
}
