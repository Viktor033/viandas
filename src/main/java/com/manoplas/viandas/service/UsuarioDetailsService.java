package com.manoplas.viandas.service;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String telefono) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByTelefono(telefono)
				.orElseThrow(() -> new UsernameNotFoundException("Teléfono no registrado"));

		return new User(usuario.getTelefono(), usuario.getContraseña(),
				List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol())));
	}
}
