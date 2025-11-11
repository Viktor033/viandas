package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.OtpRequest;
import com.manoplas.viandas.dto.VerifyRequest;
import com.manoplas.viandas.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OtpController {

	@Autowired
	private OtpService otpService;

	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
		String telefono = request.getTelefono();

		if (telefono == null || !telefono.matches("^\\d{10}$")) {
			return ResponseEntity.badRequest().body("Número inválido");
		}

		String otp = otpService.generateOtp(telefono);
		return ResponseEntity.ok("OTP enviado por SMS");
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody VerifyRequest request) {
		boolean valido = otpService.validateOtp(request.getTelefono(), request.getCodigo());

		if (valido) {
			return ResponseEntity.ok("OTP válido");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP incorrecto");
		}
	}
}
