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
        return cadeteRepository.save(cadete);
    }

    public void delete(Long id) {
        cadeteRepository.deleteById(id);
    }
}
