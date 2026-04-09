package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Pedido;
import com.manoplas.viandas.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

	@Autowired
	private PedidoRepository pedidoRepository;

	@GetMapping
	public Page<Pedido> listarTodos(Pageable pageable) {
		return pedidoRepository.findAll(pageable);
	}

	@GetMapping("/estado/{estado}")
	public Page<Pedido> buscarPorEstado(@PathVariable String estado, Pageable pageable) {
		return pedidoRepository.findByEstado(estado, pageable);
	}

	@GetMapping("/zona/{zonaId}")
	public Page<Pedido> buscarPorZona(@PathVariable Long zonaId, Pageable pageable) {
		return pedidoRepository.findByZonaId(zonaId, pageable);
	}

	@GetMapping("/fecha/{fecha}")
	public Page<Pedido> buscarPorFecha(@PathVariable String fecha, Pageable pageable) {
		return pedidoRepository.findByFecha(LocalDate.parse(fecha), pageable);
	}

	@PostMapping
	public Pedido crear(@RequestBody Pedido pedido) {
		return pedidoRepository.save(pedido);
	}

	@PutMapping("/{id}")
	public Pedido actualizar(@PathVariable Long id, @RequestBody Pedido pedido) {
		Pedido existente = pedidoRepository.findById(id).orElseThrow();
		existente.setFecha(pedido.getFecha());
		existente.setEstado(pedido.getEstado());
		existente.setUsuario(pedido.getUsuario());
		existente.setZona(pedido.getZona());
		existente.setCadete(pedido.getCadete());
		return pedidoRepository.save(existente);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		pedidoRepository.deleteById(id);
	}
}
