package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Zona;
import com.manoplas.viandas.repository.ZonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zonas")
@CrossOrigin(origins = "*")
public class ZonaController {

	@Autowired
	private ZonaRepository zonaRepository;

	@GetMapping
	public List<Zona> listarTodas() {
		return zonaRepository.findAll();
	}

	@GetMapping("/nombre/{nombre}")
	public List<Zona> buscarPorNombre(@PathVariable String nombre) {
		return zonaRepository.findByNombre(nombre);
	}

	@GetMapping("/codigo/{codigoPostal}")
	public List<Zona> buscarPorCodigoPostal(@PathVariable String codigoPostal) {
		return zonaRepository.findByCodigoPostal(codigoPostal);
	}

	@PostMapping
	public Zona crear(@RequestBody Zona zona) {
		return zonaRepository.save(zona);
	}

	@PutMapping("/{id}")
	public Zona actualizar(@PathVariable Long id, @RequestBody Zona zona) {
		Zona existente = zonaRepository.findById(id).orElseThrow();
		existente.setNombre(zona.getNombre());
		existente.setCodigoPostal(zona.getCodigoPostal());
		return zonaRepository.save(existente);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		zonaRepository.deleteById(id);
	}
}
