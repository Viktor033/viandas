package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.PedidoConDiasRequest;
import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedidos")
public class LegacyPedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping({"/con-dias", "/con-dias/"})
    public ResponseEntity<Pedido> crearPedidoConDiasLegacy(@RequestBody PedidoConDiasRequest request) {
        System.out.println("=== CREANDO PEDIDO CON DIAS (POST) [LEGACY RUTA] ===");
        return ResponseEntity.ok(pedidoService.crearPedidoConDias(request));
    }
}
