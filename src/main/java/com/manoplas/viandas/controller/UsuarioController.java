package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public List<Usuario> listarTodos() {
		return usuarioService.listarTodos();
	}

	@PostMapping
	public Usuario crear(@RequestBody Usuario usuario) {
		return usuarioService.guardar(usuario);
	}

	@PutMapping("/{id}")
	public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
		return usuarioService.actualizar(id, usuario);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		usuarioService.eliminar(id);
	}
}
