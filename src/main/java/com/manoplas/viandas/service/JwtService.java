package com.manoplas.viandas.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

	private final String SECRET_KEY = "claveSecretaViandas"; // Cambiar por una clave segura
	private final long EXPIRATION_TIME = 86400000; // 1 día en milisegundos

	public String generateToken(String phone) {
		return Jwts.builder()
				.setSubject(phone)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
				.compact();
	}
}
