package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.LoginRequest;
import com.manoplas.viandas.dto.RegistroRequest;
import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/registro")
	public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
		if (usuarioRepository.findByTelefono(request.getTelefono()).isPresent()) {
			return ResponseEntity.badRequest().body("Teléfono ya registrado");
		}

		Usuario nuevo = new Usuario();
		nuevo.setNombre(request.getNombre());
		nuevo.setTelefono(request.getTelefono());
		nuevo.setContraseña(passwordEncoder.encode(request.getContraseña()));
		nuevo.setRol(request.getRol());

		usuarioRepository.save(nuevo);
		return ResponseEntity.ok("Usuario registrado exitosamente");
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		try {
			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getTelefono(), request.getContraseña())
			);
			return ResponseEntity.ok("Login exitoso");
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
		}
	}
}
