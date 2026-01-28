package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.PedidoRequest;
import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody PedidoRequest request) {
        return ResponseEntity.ok(pedidoService.crearPedido(request));
    }

    @GetMapping("/mis-pedidos")
    public List<Pedido> misPedidos() {
        return pedidoService.misPedidos();
    }
}
