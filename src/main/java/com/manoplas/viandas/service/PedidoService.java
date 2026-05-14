package com.manoplas.viandas.service;

import com.manoplas.viandas.dto.DetallePedidoDTO;
import com.manoplas.viandas.dto.PedidoRequest;
import com.manoplas.viandas.model.*;
import com.manoplas.viandas.repository.PedidoRepository;
import com.manoplas.viandas.repository.ProductoRepository;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Pedido crearPedido(PedidoRequest request) {
        String telefono = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByTelefono(telefono)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(EstadoPedido.PENDIENTE);

        try {
            if (request.getMetodoPago() != null && !request.getMetodoPago().isEmpty()) {
                pedido.setMetodoPago(MetodoPago.valueOf(request.getMetodoPago().toUpperCase()));
            } else {
                pedido.setMetodoPago(MetodoPago.EFECTIVO);
            }
        } catch (IllegalArgumentException e) {
            pedido.setMetodoPago(MetodoPago.EFECTIVO);
        }

        double total = 0;

        for (DetallePedidoDTO item : request.getItems()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductoId()));

            DetallePedido detalle = new DetallePedido();
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());

            pedido.addDetalle(detalle);
            total += (producto.getPrecio() * item.getCantidad());
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido crearPedidoConDias(com.manoplas.viandas.dto.PedidoConDiasRequest request) {
        String telefono = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByTelefono(telefono)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setDiasSeleccionados(request.getDiasSeleccionados());
        pedido.setEsMensual(request.getEsMensual() != null && request.getEsMensual());

        try {
            if (request.getMetodoPago() != null && !request.getMetodoPago().isEmpty()) {
                pedido.setMetodoPago(MetodoPago.valueOf(request.getMetodoPago().toUpperCase()));
            } else {
                pedido.setMetodoPago(MetodoPago.EFECTIVO);
            }
        } catch (IllegalArgumentException e) {
            pedido.setMetodoPago(MetodoPago.EFECTIVO);
        }

        double total = 0;
        for (com.manoplas.viandas.dto.PedidoConDiasRequest.DetalleConDiasDTO item : request.getDetalles()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductoId()));

            DetallePedido detalle = new DetallePedido();
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setObservaciones(item.getObservaciones());

            pedido.addDetalle(detalle);
            total += producto.getPrecio() * item.getCantidad();
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> misPedidos() {
        String telefono = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByTelefono(telefono)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return pedidoRepository.findByUsuarioOrderByFechaDesc(usuario);
    }

    public List<Pedido> getAllPedidos() {
        // Traer todos pero filtrar los ARCHIVADOS en memoria o query
        // Mejor hacer query nativa, pero para simplificar y mantener compatibilidad con
        // lo existente:
        List<Pedido> all = pedidoRepository.findAll();
        // removeIf es mutable
        all.removeIf(p -> p.getEstado() == EstadoPedido.ARCHIVADO);
        // Ordenar por fecha descendente ya que estamos
        all.sort((a, b) -> b.getFecha().compareTo(a.getFecha()));
        return all;
    }
    
    public List<Pedido> getPedidosCocina() {
        return pedidoRepository.findByEstadoInOrderByFechaDesc(
            java.util.Arrays.asList(EstadoPedido.PENDIENTE, EstadoPedido.EN_PREPARACION, EstadoPedido.EN_CAMINO)
        );
    }

    @Transactional
    public Pedido actualizarEstadoPedido(Long id, String estado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        try {
            pedido.setEstado(EstadoPedido.valueOf(estado));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + estado);
        }

        return pedidoRepository.save(pedido);
    }

    // Obtener pedidos por cadete (usando la relación usuario-cadete)
    public List<Pedido> getPedidosByCadete(Long cadeteId) {
        // Primero buscamos el cadete
        Cadete cadete = new Cadete();
        cadete.setId(cadeteId);

        return pedidoRepository.findByUsuarioCadeteOrderByFechaDesc(cadete);
    }

    @Transactional
    public int archivarPedidosEntregados() {
        return pedidoRepository.archivarPedidosEntregados();
    }

    public List<com.manoplas.viandas.dto.ReporteVentasDTO> obtenerReporteVentas() {
        return pedidoRepository.generarReporteVentas();
    }

    public com.manoplas.viandas.dto.ReporteDiarioCompletoDTO obtenerReporteDiario() {
        List<com.manoplas.viandas.dto.ReporteDiarioDTO> pagos = pedidoRepository.obtenerReporteDiario();
        List<com.manoplas.viandas.dto.ReporteProductoDiaDTO> productos = pedidoRepository.obtenerProductosVendidosHoy();

        double total = pagos.stream().mapToDouble(com.manoplas.viandas.dto.ReporteDiarioDTO::getTotalVentas).sum();
        int cantidad = pagos.stream().mapToInt(p -> p.getCantidadPedidos().intValue()).sum();

        return new com.manoplas.viandas.dto.ReporteDiarioCompletoDTO(pagos, productos, total, cantidad);
    }

    public com.manoplas.viandas.dto.ResumenSemanalDTO obtenerResumenSemanal() {
        com.manoplas.viandas.dto.ResumenSemanalDTO resumen = new com.manoplas.viandas.dto.ResumenSemanalDTO();
        
        // Inicializar mapas
        String[] dias = {"Lunes", "Martes", "Miercoles", "Jueves", "Viernes"};
        String[] productosSemanales = {"STANDARD", "CALORIAS", "SALAD"};
        String[] opcionesFinSemana = {"OPC 1", "OPC 2", "OPC 3", "EXTRA"};
        
        for (String p : productosSemanales) {
            Map<String, com.manoplas.viandas.dto.ResumenSemanalDTO.DiaCountsDTO> diaMap = new java.util.HashMap<>();
            for (String d : dias) {
                diaMap.put(d, new com.manoplas.viandas.dto.ResumenSemanalDTO.DiaCountsDTO());
            }
            resumen.getTotalesSemanales().put(p, diaMap);
        }
        
        for (String op : opcionesFinSemana) {
            Map<String, Integer> fsMap = new java.util.HashMap<>();
            fsMap.put("Sabado", 0);
            fsMap.put("Domingo", 0);
            resumen.getTotalesFinSemana().put(op, fsMap);
        }

        for (String d : dias) {
            resumen.getTotalesDiarios().put(d, 0);
            resumen.getTotalesDiariosConEspeciales().put(d, 0);
        }

        // Obtener pedidos relevantes (no cancelados ni archivados)
        List<Pedido> pedidos = pedidoRepository.findByEstadoInOrderByFechaDesc(
            java.util.Arrays.asList(EstadoPedido.PENDIENTE, EstadoPedido.EN_PREPARACION, EstadoPedido.EN_CAMINO, EstadoPedido.ENTREGADO)
        );

        for (Pedido p : pedidos) {
            if (p.getDiasSeleccionados() == null || p.getDiasSeleccionados().isEmpty()) continue;
            
            String[] diasPedido = p.getDiasSeleccionados().split(",");
            boolean esClienteMakro = p.getUsuario() != null && Boolean.TRUE.equals(p.getUsuario().getEsMakro());
            
            for (DetallePedido dp : p.getDetalles()) {
                Producto prod = dp.getProducto();
                String nombreProd = prod.getNombre().toUpperCase();
                String obs = dp.getObservaciones() != null ? dp.getObservaciones().toUpperCase() : "";
                boolean esSinSal = obs.contains("SIN SAL") || obs.contains("S/S") || obs.contains("NO SAL");
                
                // Determinar días a procesar para este detalle específico
                List<String> diasAProcesar = new java.util.ArrayList<>();
                if (prod.getDia() != null && "Todos".equalsIgnoreCase(prod.getDia())) {
                    for (String d : diasPedido) diasAProcesar.add(normalizarDia(d));
                } else if (prod.getDia() != null) {
                    String dProdLimpio = normalizarDia(prod.getDia());
                    // Solo procesar si el día del producto está entre los seleccionados del pedido
                    for (String d : diasPedido) {
                        if (normalizarDia(d).equalsIgnoreCase(dProdLimpio)) {
                            diasAProcesar.add(dProdLimpio);
                            break;
                        }
                    }
                    // Si es cliente Makro y el producto es de fin de semana, pero el pedido no tiene el día marcado, forzarlo
                    if (esClienteMakro && diasAProcesar.isEmpty() && (dProdLimpio.equals("Sabado") || dProdLimpio.equals("Domingo"))) {
                        diasAProcesar.add(dProdLimpio);
                    }
                }

                // 1. CUADRO SEMANAL (STANDARD, CALORIAS, SALAD)
                String categoria = "";
                if (nombreProd.contains("STANDARD") || obs.contains("STANDARD")) categoria = "STANDARD";
                else if (nombreProd.contains("CALORIAS") || nombreProd.contains("CALORICO") || obs.contains("CALORIAS")) categoria = "CALORIAS";
                else if (nombreProd.contains("SALAD") || nombreProd.contains("ENSALADA") || obs.contains("SALAD")) categoria = "SALAD";

                if (!categoria.isEmpty()) {
                    for (String dia : diasAProcesar) {
                        if (resumen.getTotalesSemanales().containsKey(categoria) && resumen.getTotalesSemanales().get(categoria).containsKey(dia)) {
                            com.manoplas.viandas.dto.ResumenSemanalDTO.DiaCountsDTO counts = resumen.getTotalesSemanales().get(categoria).get(dia);
                            if (esSinSal) counts.setSinSal(counts.getSinSal() + dp.getCantidad());
                            else counts.setNormal(counts.getNormal() + dp.getCantidad());
                            
                            // Sumar al total diario (semanal)
                            resumen.getTotalesDiarios().put(dia, resumen.getTotalesDiarios().getOrDefault(dia, 0) + dp.getCantidad());
                        }
                    }
                }

                // 2. CUADRO MAKRO (Fin de semana o Cliente Makro)
                boolean esProdFinSemana = prod.getDia() != null && (prod.getDia().equalsIgnoreCase("Sabado") || prod.getDia().equalsIgnoreCase("Domingo"));
                
                if (esProdFinSemana || esClienteMakro) {
                    String opcionFS = "EXTRA";
                    if (nombreProd.contains("OPC 1")) opcionFS = "OPC 1";
                    else if (nombreProd.contains("OPC 2")) opcionFS = "OPC 2";
                    else if (nombreProd.contains("OPC 3")) opcionFS = "OPC 3";

                    // Para el reporte Makro, si no tiene días de fin de semana pero es cliente Makro, lo mandamos a Sabado
                    if (diasAProcesar.isEmpty() && esClienteMakro) {
                        diasAProcesar.add("Sabado");
                    }

                    for (String dia : diasAProcesar) {
                        String diaReporte = (dia.equals("Sabado") || dia.equals("Domingo")) ? dia : "Sabado";
                        Map<String, Integer> fsMap = resumen.getTotalesFinSemana().get(opcionFS);
                        if (fsMap != null) {
                            fsMap.put(diaReporte, fsMap.getOrDefault(diaReporte, 0) + dp.getCantidad());
                        }
                    }
                }
            }
        }

        // Calcular totales diarios finales (incluyendo especiales)
        for (String d : dias) {
            int totalNormal = 0;
            int totalEspecial = 0;
            for (String p : productosSemanales) {
                com.manoplas.viandas.dto.ResumenSemanalDTO.DiaCountsDTO counts = resumen.getTotalesSemanales().get(p).get(d);
                totalNormal += counts.getNormal();
                totalEspecial += counts.getSinSal();
            }
            resumen.getTotalesDiarios().put(d, totalNormal);
            resumen.getTotalesDiariosConEspeciales().put(d, totalNormal + totalEspecial);
        }

        return resumen;
    }

    private String normalizarDia(String dia) {
        if (dia == null) return "";
        String d = dia.trim().toLowerCase();
        if (d.contains("lun")) return "Lunes";
        if (d.contains("mar")) return "Martes";
        if (d.contains("mie") || d.contains("mié")) return "Miercoles";
        if (d.contains("jue")) return "Jueves";
        if (d.contains("vie")) return "Viernes";
        if (d.contains("sab") || d.contains("sáb")) return "Sabado";
        if (d.contains("dom")) return "Domingo";
        return "";
    }

    @Transactional
    public long deletePedidosEntregadosByCliente(Long clienteId) {
        return pedidoRepository.deleteByUsuarioIdAndEstado(clienteId, EstadoPedido.ENTREGADO);
    }

    @Transactional
    public long deleteAllPedidosByCliente(Long clienteId) {
        return pedidoRepository.deleteByUsuarioId(clienteId);
    }

    public List<Pedido> getPedidosByCliente(Long clienteId) {
        return pedidoRepository.findByUsuarioIdOrderByFechaDesc(clienteId);
    }
}
