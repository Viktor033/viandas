package com.manoplas.viandas.service;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

	private final String SECRET_KEY = "claveSecretaViandas"; // Cambiar por una clave segura
	private final long EXPIRATION_TIME = 86400000; // 1 día en milisegundos

	// ✅ Generar token con el teléfono como subject
	public String generateToken(String phone) {
		return Jwts.builder()
				.setSubject(phone)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
				.compact();
	}

	// ✅ Validar token (comprueba firma y expiración)
	public boolean validarToken(String token) {
		try {
			Jwts.parser()
					.setSigningKey(SECRET_KEY)
					.parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	// ✅ Extraer teléfono (subject) del token
	public String extraerTelefono(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
}
