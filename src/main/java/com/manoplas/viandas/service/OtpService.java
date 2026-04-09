package com.manoplas.viandas.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

	private final Map<String, String> otpStorage = new HashMap<>();

	public String generateOtp(String phone) {
		String code = String.format("%06d", new Random().nextInt(999999));
		otpStorage.put(phone, code);
		System.out.println("Código generado para " + phone + ": " + code); // Simulación
		return code;
	}

	public boolean validateOtp(String phone, String code) {
		String storedCode = otpStorage.get(phone);
		return storedCode != null && storedCode.equals(code);
	}
}
