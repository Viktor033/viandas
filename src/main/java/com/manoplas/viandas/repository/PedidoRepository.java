package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Cadete;
import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
        List<Pedido> findByUsuarioOrderByFechaDesc(Usuario usuario);

        // Obtener pedidos cuyo usuario tiene asignado un cadete específico
        @Query("SELECT p FROM Pedido p WHERE p.usuario.cadete = :cadete ORDER BY p.fecha DESC")
        List<Pedido> findByUsuarioCadeteOrderByFechaDesc(@Param("cadete") Cadete cadete);

        // Query para reporte de ventas (productos vendidos en pedidos entregados o
        // archivados)
        @Query("SELECT prod.nombre as producto, SUM(dp.cantidad) as cantidad, SUM(dp.cantidad * dp.precioUnitario) as total "
                        +
                        "FROM DetallePedido dp " +
                        "JOIN dp.pedido p " +
                        "JOIN dp.producto prod " +
                        "WHERE p.estado IN ('ENTREGADO', 'ARCHIVADO') " +
                        "GROUP BY prod.nombre " +
                        "ORDER BY total DESC")
        List<com.manoplas.viandas.dto.ReporteVentasDTO> generarReporteVentas();

        List<Pedido> findByEstado(com.manoplas.viandas.model.EstadoPedido estado);

        // Para listar en el panel admin (excluyendo archivados si se desea)
        // Pero por defecto findAll trae todo. Podemos filtrar en service o frontend.

        @org.springframework.data.jpa.repository.Modifying
        @Query(value = "UPDATE pedidos SET estado = 'ARCHIVADO' WHERE estado = 'ENTREGADO'", nativeQuery = true)
        int archivarPedidosEntregados();

        @Query("SELECT new com.manoplas.viandas.dto.ReporteDiarioDTO(p.metodoPago, COUNT(p), SUM(p.total)) " +
                        "FROM Pedido p " +
                        "WHERE FUNCTION('DATE', p.fecha) = CURRENT_DATE " +
                        "AND p.estado != 'CANCELADO' " +
                        "GROUP BY p.metodoPago")
        List<com.manoplas.viandas.dto.ReporteDiarioDTO> obtenerReporteDiario();

        @Query("SELECT new com.manoplas.viandas.dto.ReporteProductoDiaDTO(prod.nombre, SUM(dp.cantidad), SUM(dp.cantidad * dp.precioUnitario)) "
                        +
                        "FROM DetallePedido dp " +
                        "JOIN dp.pedido p " +
                        "JOIN dp.producto prod " +
                        "WHERE FUNCTION('DATE', p.fecha) = CURRENT_DATE " +
                        "AND p.estado != 'CANCELADO' " +
                        "GROUP BY prod.nombre")
        List<com.manoplas.viandas.dto.ReporteProductoDiaDTO> obtenerProductosVendidosHoy();
}
