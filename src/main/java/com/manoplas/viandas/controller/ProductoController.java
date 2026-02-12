package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Producto;
import com.manoplas.viandas.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200") // Permitir frontend Angular
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Público: Ver lista de productos activos para el menú
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.obtenerActivos();
    }

    // Solo Admin: Ver todos (incluidos inactivos si se desea, o para gestión)
    @GetMapping("/admin/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Producto> listarTodosAdmin() {
        return productoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Solo Admin: Crear/Actualizar
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Producto guardarProducto(@RequestBody Producto producto) {
        return productoService.guardarProducto(producto);
    }

    // Solo Admin: Eliminar
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok().build();
    }
}
