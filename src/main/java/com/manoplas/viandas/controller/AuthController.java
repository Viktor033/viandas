package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.*;
import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import com.manoplas.viandas.service.JwtService;
import com.manoplas.viandas.service.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private TwilioService twilioService;

	@Autowired
	private JwtService jwtService;

	// Enviar OTP por SMS usando Twilio Verify
	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
		String telefono = request.getTelefono();

		if (telefono == null || telefono.length() != 10) {
			return ResponseEntity.badRequest().body("Número inválido");
		}

		try {
			twilioService.enviarOtp(telefono);
			return ResponseEntity.ok("OTP enviado");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al enviar OTP: " + e.getMessage());
		}
	}

	// Verificar OTP y generar JWT
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody VerifyRequest request) {
		String telefono = request.getTelefono();
		String codigo = request.getCodigo();

		if (telefono == null || codigo == null) {
			return ResponseEntity.badRequest().body("Datos incompletos");
		}

		boolean valido = twilioService.verificarOtp(telefono, codigo);

		if (!valido) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Código inválido");
		}

		// Buscar o crear usuario
		Usuario usuario = usuarioRepository.findByTelefono(telefono)
				.orElseGet(() -> {
					Usuario nuevo = new Usuario();
					nuevo.setTelefono(telefono);
					nuevo.setNombre("Invitado");
					nuevo.setRol("USER");
					nuevo.setContraseña(""); // si es obligatorio
					return usuarioRepository.save(nuevo);
				});

		// Generar JWT real
		String token = jwtService.generateToken(usuario.getTelefono());

		return ResponseEntity.ok(new TokenResponse(token));
	}

	// (Opcional) Registro manual si querés mantenerlo
	@PostMapping("/registro")
	public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
		if (usuarioRepository.findByTelefono(request.getTelefono()).isPresent()) {
			return ResponseEntity.badRequest().body("Teléfono ya registrado");
		}

		Usuario nuevo = new Usuario();
		nuevo.setNombre(request.getNombre());
		nuevo.setTelefono(request.getTelefono());
		nuevo.setContraseña(request.getContraseña()); // opcional si usás OTP
		nuevo.setRol(request.getRol());

		usuarioRepository.save(nuevo);
		return ResponseEntity.ok("Usuario registrado exitosamente");
	}

	// (Opcional) Login tradicional si querés mantenerlo
	// Podés eliminar este método si usás solo OTP
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
				.body("Login tradicional deshabilitado. Usá OTP.");
	}
}
