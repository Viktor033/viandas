package com.manoplas.viandas.service;

import com.manoplas.viandas.model.Cadete;
import com.manoplas.viandas.repository.CadeteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CadeteService {

    private final CadeteRepository cadeteRepository;

    public CadeteService(CadeteRepository cadeteRepository) {
        this.cadeteRepository = cadeteRepository;
    }

    public List<Cadete> findAll() {
        return cadeteRepository.findAll();
    }

    public Optional<Cadete> findById(Long id) {
        return cadeteRepository.findById(id);
    }

    public Cadete save(Cadete cadete) {
        Optional<Cadete> existingCadete = cadeteRepository.findByTelefono(cadete.getTelefono());

        if (existingCadete.isPresent()) {
            Cadete existing = existingCadete.get();

            // Permitir si es el MISMO cadete que estamos editando
            if (cadete.getId() != null && cadete.getId().equals(existing.getId())) {
                return cadeteRepository.save(cadete);
            }

            if (Boolean.TRUE.equals(existing.getActivo())) {
                // Si ya existe y está activo -> Error (lo manejará el Controller/Frontend)
                throw new RuntimeException("El cadete ya existe con ese teléfono.");
            } else {
                // Si existe pero está INACTIVO ("eliminado") -> Lo reactivamos
                existing.setActivo(true);
                existing.setNombre(cadete.getNombre());
                existing.setApellido(cadete.getApellido());
                existing.setVehiculo(cadete.getVehiculo());
                System.out.println("REACTIVANDO CADETE: " + existing.getNombre());
                return cadeteRepository.save(existing);
            }
        }

        return cadeteRepository.save(cadete);
    }

    public void delete(Long id) {
        // Implementación de Soft Delete (Borrado Lógico)
        cadeteRepository.findById(id).ifPresent(cadete -> {
            cadete.setActivo(false);
            cadeteRepository.save(cadete);
        });
    }
}
