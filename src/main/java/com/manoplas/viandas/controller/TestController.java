package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private com.manoplas.viandas.repository.CadeteRepository cadeteRepository;

	@GetMapping("/usuarios")
	public List<Usuario> listarUsuarios() {
		return usuarioRepository.findAll();
	}

	@GetMapping("/limpiar-telefonos")
	public String limpiarTelefonos() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		int countUsuarios = 0;
		for (Usuario u : usuarios) {
			if (!"ADMIN".equals(u.getRol())) {
				u.setTelefono(null);
				countUsuarios++;
			}
		}
		usuarioRepository.saveAll(usuarios);

		List<com.manoplas.viandas.model.Cadete> cadetes = cadeteRepository.findAll();
		for (com.manoplas.viandas.model.Cadete c : cadetes) {
			c.setTelefono(null);
		}
		cadeteRepository.saveAll(cadetes);

		return "Limpieza completada: Se borraron telefonos de " + countUsuarios + " usuarios (no ADMIN) y "
				+ cadetes.size() + " cadetes.";
	}

	@GetMapping("/limpiar-asignaciones")
	public String limpiarAsignaciones() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		int count = 0;
		for (Usuario u : usuarios) {
			if (u.getCadete() != null) {
				u.setCadete(null);
				count++;
			}
		}
		usuarioRepository.saveAll(usuarios);
		return "Asignaciones limpiadas: Se desvincularon " + count + " usuarios de sus cadetes.";
	}
}
