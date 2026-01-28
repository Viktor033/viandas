package com.manoplas.viandas.dto;

import lombok.Data;
import java.util.List;

@Data
public class PedidoRequest {
    private List<DetallePedidoDTO> items;
}
