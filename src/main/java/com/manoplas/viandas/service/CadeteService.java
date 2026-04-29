package com.manoplas.viandas.service;

import com.manoplas.viandas.model.Cadete;
import com.manoplas.viandas.repository.CadeteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CadeteService {

    private final CadeteRepository cadeteRepository;
    private final com.manoplas.viandas.repository.UsuarioRepository usuarioRepository;

    public CadeteService(CadeteRepository cadeteRepository,
            com.manoplas.viandas.repository.UsuarioRepository usuarioRepository) {
        this.cadeteRepository = cadeteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Cadete> findAll() {
        return cadeteRepository.findByActivoTrue();
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
        // Implementación de Soft Delete (Borrado Lógico) con Cascada manual
        cadeteRepository.findById(id).ifPresent(cadete -> {
            // Desvincular usuarios
            List<com.manoplas.viandas.model.Usuario> usuarios = usuarioRepository.findByCadete(cadete);
            for (com.manoplas.viandas.model.Usuario u : usuarios) {
                u.setCadete(null);
            }
            usuarioRepository.saveAll(usuarios);

            // Soft delete
            cadete.setActivo(false);
            cadeteRepository.save(cadete);
        });
    }
}
