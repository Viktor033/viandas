package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Insumo;
import com.manoplas.viandas.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insumos")
@PreAuthorize("hasAnyRole('ADMIN', 'COCINERO')")
public class InsumoController {

    @Autowired
    private InsumoRepository insumoRepository;

    @GetMapping
    public List<Insumo> getAllInsumos() {
        return insumoRepository.findAll();
    }

    @PostMapping
    public Insumo createInsumo(@RequestBody Insumo insumo) {
        return insumoRepository.save(insumo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insumo> updateInsumo(@PathVariable Long id, @RequestBody Insumo insumoDetails) {
        return insumoRepository.findById(id)
                .map(insumo -> {
                    insumo.setNombre(insumoDetails.getNombre());
                    insumo.setCantidad(insumoDetails.getCantidad());
                    insumo.setComprado(insumoDetails.getComprado());
                    return ResponseEntity.ok(insumoRepository.save(insumo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInsumo(@PathVariable Long id) {
        return insumoRepository.findById(id)
                .map(insumo -> {
                    insumoRepository.delete(insumo);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
