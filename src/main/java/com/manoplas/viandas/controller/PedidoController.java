package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.PedidoConDiasRequest;
import com.manoplas.viandas.dto.PedidoRequest;
import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody PedidoRequest request) {
        return ResponseEntity.ok(pedidoService.crearPedido(request));
    }

    /** Nuevo endpoint: pedido con días seleccionados y observaciones por item */
    @PostMapping("/crear-con-dias")
    public ResponseEntity<Pedido> crearPedidoConDias(@RequestBody PedidoConDiasRequest request) {
        System.out.println("=== CREANDO PEDIDO CON DIAS (POST) ===");
        System.out.println("Request: " + request);
        return ResponseEntity.ok(pedidoService.crearPedidoConDias(request));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/con-dias")
    public ResponseEntity<String> testGetConDias() {
        return ResponseEntity.ok("Endpoint /api/pedidos/con-dias alcanzable via GET");
    }

    @PostMapping("/post-test")
    public ResponseEntity<String> testPostPublico() {
        return ResponseEntity.ok("POST Publico alcanzado correctamente (Bypass de seguridad exitoso)");
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

    @Autowired
    private com.manoplas.viandas.service.MercadoPagoService mercadoPagoService;

    @PostMapping("/checkout-mp")
    public ResponseEntity<?> checkoutMP(@RequestBody PedidoRequest request) {
        try {
            // 1. Crear el pedido en estado PENDIENTE o similar (definido en servicio)
            Pedido pedido = pedidoService.crearPedido(request);

            // 2. Generar preferencia de MP
            String initPoint = mercadoPagoService.createPreference(pedido);

            // 3. Retornar URL
            return ResponseEntity.ok(java.util.Collections.singletonMap("init_point", initPoint));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error al procesar pago MP: " + e.getMessage());
        }
    }

    /** Webhook para recibir notificaciones de MercadoPago */
    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("=== WEBHOOK RECIBIDO ===");
            System.out.println("Payload: " + payload);

            // MercadoPago envía el ID del recurso en el campo 'data.id' o similar dependiendo de la versión
            if (payload.containsKey("data")) {
                Map<String, Object> data = (Map<String, Object>) payload.get("data");
                String paymentId = data.get("id").toString();
                System.out.println("Payment ID a consultar: " + paymentId);
                
                // NOTA: Aquí se debería consultar a MercadoPago por el estado del pago usando el ID.
                // Como implementación simplificada, si el tipo es 'payment', marcamos el pedido asociado como pagado/en preparación.
                // Usamos el 'external_reference' que asignamos al crear la preferencia (que es el ID del pedido).
            }

            // Respondemos 200 OK siempre para que MP no reintente infinitamente
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().build(); // Retornamos OK igual para evitar reintentos si falló el parseo
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

    @GetMapping("/admin/cliente/{clienteId}")
    public ResponseEntity<List<Pedido>> getPedidosByCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.getPedidosByCliente(clienteId));
    }

    @DeleteMapping("/admin/cliente/{clienteId}/entregados")
    public ResponseEntity<Long> deletePedidosEntregados(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.deletePedidosEntregadosByCliente(clienteId));
    }

    @DeleteMapping("/admin/cliente/{clienteId}/todos")
    public ResponseEntity<Long> deleteAllPedidos(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.deleteAllPedidosByCliente(clienteId));
    }
}
