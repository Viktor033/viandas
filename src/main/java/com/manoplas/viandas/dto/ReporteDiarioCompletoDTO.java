package com.manoplas.viandas.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReporteDiarioCompletoDTO {
    private List<ReporteDiarioDTO> resumenPagos;
    private List<ReporteProductoDiaDTO> rankingProductos;
    private Double totalGeneral;
    private Integer cantidadPedidos;
}
