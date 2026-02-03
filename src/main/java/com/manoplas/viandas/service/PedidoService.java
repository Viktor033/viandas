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
}
