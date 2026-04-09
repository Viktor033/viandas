package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Vianda;
import com.manoplas.viandas.repository.ViandaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viandas")
@CrossOrigin(origins = "*")
public class ViandaController {

	@Autowired
	private ViandaRepository viandaRepository;

	@GetMapping
	public List<Vianda> listarTodas() {
		return viandaRepository.findAll();
	}

	@GetMapping("/nombre/{nombre}")
	public List<Vianda> buscarPorNombre(@PathVariable String nombre) {
		return viandaRepository.findByNombre(nombre);
	}

	@GetMapping("/precio/{precio}")
	public List<Vianda> buscarPorPrecio(@PathVariable Double precio) {
		return viandaRepository.findByPrecioLessThanEqual(precio);
	}

	@PostMapping
	public Vianda crear(@RequestBody Vianda vianda) {
		return viandaRepository.save(vianda);
	}

	@PutMapping("/{id}")
	public Vianda actualizar(@PathVariable Long id, @RequestBody Vianda vianda) {
		Vianda existente = viandaRepository.findById(id).orElseThrow();
		existente.setNombre(vianda.getNombre());
		existente.setDescripcion(vianda.getDescripcion());
		existente.setPrecio(vianda.getPrecio());
		return viandaRepository.save(existente);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		viandaRepository.deleteById(id);
	}
}
