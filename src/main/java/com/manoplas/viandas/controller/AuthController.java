package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.*;
import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import com.manoplas.viandas.util.OtpStore;
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

	// Registro de usuario
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

	// Login con teléfono y contraseña
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

	// Enviar código OTP
	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
		String telefono = request.getTelefono();

		if (telefono == null || telefono.length() != 10) {
			return ResponseEntity.badRequest().body("Número inválido");
		}

		// Generar OTP aleatorio
		String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

		// Guardar OTP en memoria
		OtpStore.saveOtp(telefono, otp);

		// Simular envío (mostrar en consola)
		System.out.println("OTP para " + telefono + ": " + otp);

		return ResponseEntity.ok("OTP enviado");
	}

	// Verificar código OTP
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody VerifyRequest request) {
		String telefono = request.getTelefono();
		String codigo = request.getCodigo();

		String otpGuardado = OtpStore.getOtp(telefono);

		if (otpGuardado != null && otpGuardado.equals(codigo)) {
			OtpStore.removeOtp(telefono); // eliminar después de usar
			return ResponseEntity.ok(new TokenResponse("mocked-jwt-token"));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Código inválido");
		}
	}
}
