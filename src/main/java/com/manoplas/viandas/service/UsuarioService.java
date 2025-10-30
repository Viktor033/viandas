package com.manoplas.viandas.service;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public List<Usuario> listarTodos() {
		return usuarioRepository.findAll();
	}

	public Usuario guardar(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Usuario actualizar(Long id, Usuario usuario) {
		Usuario existente = usuarioRepository.findById(id).orElseThrow();
		existente.setNombre(usuario.getNombre());
		existente.setEmail(usuario.getEmail());
		existente.setContraseña(usuario.getContraseña());
		existente.setRol(usuario.getRol());
		return usuarioRepository.save(existente);
	}

	public void eliminar(Long id) {
		usuarioRepository.deleteById(id);
	}
}
