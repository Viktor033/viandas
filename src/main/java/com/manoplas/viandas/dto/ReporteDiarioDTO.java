package com.manoplas.viandas.dto;

import com.manoplas.viandas.model.MetodoPago;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReporteDiarioDTO {
    private MetodoPago metodoPago;
    private Long cantidadPedidos;
    private Double totalVentas;
}
