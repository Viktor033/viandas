package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Cadete;
import com.manoplas.viandas.service.CadeteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cadetes")
@CrossOrigin(origins = "http://localhost:4200")
public class CadeteController {

    private final CadeteService cadeteService;

    public CadeteController(CadeteService cadeteService) {
        this.cadeteService = cadeteService;
    }

    @GetMapping
    public List<Cadete> getAll() {
        return cadeteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cadete> getById(@PathVariable Long id) {
        return cadeteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cadete create(@RequestBody Cadete cadete) {
        return cadeteService.save(cadete);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cadete> update(@PathVariable Long id, @RequestBody Cadete cadeteDetails) {
        return cadeteService.findById(id)
                .map(cadete -> {
                    cadete.setNombre(cadeteDetails.getNombre());
                    cadete.setVehiculo(cadeteDetails.getVehiculo());
                    cadete.setTelefono(cadeteDetails.getTelefono());
                    cadete.setActivo(cadeteDetails.getActivo());
                    return ResponseEntity.ok(cadeteService.save(cadete));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (cadeteService.findById(id).isPresent()) {
            cadeteService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
