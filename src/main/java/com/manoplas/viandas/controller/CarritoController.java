package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.PedidoConDiasRequest;
import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/enviar")
    public ResponseEntity<?> enviarCarrito(@RequestBody PedidoConDiasRequest request) {
        System.out.println("CARRITO CONTROLLER - ENVIAR");
        try {
            Pedido p = pedidoService.crearPedidoConDias(request);
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("carrito pong");
    }
}
