package com.manoplas.viandas.dto;

import lombok.Data;
import java.util.List;

/**
 * DTO para el nuevo endpoint /api/pedidos/con-dias que acepta
 * días seleccionados, opción mensual y observaciones por item.
 */
@Data
public class PedidoConDiasRequest {

    private List<DetalleConDiasDTO> detalles;
    private String diasSeleccionados; // Ej: "Lunes,Miércoles,Viernes"
    private Boolean esMensual = false;
    private String metodoPago;

    @Data
    public static class DetalleConDiasDTO {
        private Long productoId;
        private Integer cantidad;
        private Double precioUnitario;
        private String observaciones;
    }
}
