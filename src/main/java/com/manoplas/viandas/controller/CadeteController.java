package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Cadete;
import com.manoplas.viandas.repository.CadeteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cadetes")
@CrossOrigin(origins = "*")
public class CadeteController {

	@Autowired
	private CadeteRepository cadeteRepository;

	@GetMapping
	public List<Cadete> listarTodos() {
		return cadeteRepository.findAll();
	}

	@PostMapping
	public Cadete crear(@RequestBody Cadete cadete) {
		return cadeteRepository.save(cadete);
	}

	@PutMapping("/{id}")
	public Cadete actualizar(@PathVariable Long id, @RequestBody Cadete cadete) {
		Cadete existente = cadeteRepository.findById(id).orElseThrow();
		existente.setNombre(cadete.getNombre());
		existente.setApellido(cadete.getApellido());
		existente.setDni(cadete.getDni());
		existente.setTelefono(cadete.getTelefono());
		existente.setZonaAsignada(cadete.getZonaAsignada());
		existente.setActivo(cadete.getActivo());
		existente.setFechaIngreso(cadete.getFechaIngreso());
		existente.setObservaciones(cadete.getObservaciones());
		return cadeteRepository.save(existente);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		cadeteRepository.deleteById(id);
	}
}
