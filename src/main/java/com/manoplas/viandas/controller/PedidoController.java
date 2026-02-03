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

    @GetMapping("/admin/todos")
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Pedido> actualizarEstado(@PathVariable Long id, @RequestBody String estado) {
        // El body vendrá como string simple o JSON value, aquí asumimos string simple
        // para simplificar,
        // pero mejor usar un Map o DTO si se complica. Para @RequestBody String a veces
        // trae comillas.
        // Vamos a limpiar las comillas por si acaso.
        String estadoLimpio = estado.replace("\"", "").trim();
        return ResponseEntity.ok(pedidoService.actualizarEstadoPedido(id, estadoLimpio));
    }

    // Endpoint para obtener pedidos de un cadete específico
    @GetMapping("/cadete/{cadeteId}")
    public ResponseEntity<List<Pedido>> getPedidosByCadete(@PathVariable Long cadeteId) {
        return ResponseEntity.ok(pedidoService.getPedidosByCadete(cadeteId));
    }

    @PostMapping("/admin/archivar-entregados")
    public ResponseEntity<?> archivarPedidosEntregados() {
        try {
            int count = pedidoService.archivarPedidosEntregados();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            e.printStackTrace(); // Para ver en consola del servidor
            return ResponseEntity.internalServerError().body("Error al archivar: " + e.getMessage());
        }
    }

    @GetMapping("/admin/reporte-ventas")
    public ResponseEntity<List<com.manoplas.viandas.dto.ReporteVentasDTO>> obtenerReporteVentas() {
        return ResponseEntity.ok(pedidoService.obtenerReporteVentas());
    }

    @GetMapping("/admin/reporte-diario")
    public ResponseEntity<com.manoplas.viandas.dto.ReporteDiarioCompletoDTO> obtenerReporteDiario() {
        return ResponseEntity.ok(pedidoService.obtenerReporteDiario());
    }
}
