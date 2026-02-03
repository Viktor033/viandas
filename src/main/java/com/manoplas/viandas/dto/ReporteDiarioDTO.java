package com.manoplas.viandas.dto;

import com.manoplas.viandas.model.MetodoPago;

public interface ReporteDiarioDTO {
    MetodoPago getMetodoPago();

    Long getCantidadPedidos();

    Double getTotalVentas();
}
