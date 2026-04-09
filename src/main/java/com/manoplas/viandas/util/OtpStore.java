package com.manoplas.viandas.util;

import java.util.concurrent.ConcurrentHashMap;

public class OtpStore {
	private static final ConcurrentHashMap<String, String> store = new ConcurrentHashMap<>();

	public static void saveOtp(String telefono, String otp) {
		store.put(telefono, otp);
	}

	public static String getOtp(String telefono) {
		return store.get(telefono);
	}

	public static void removeOtp(String telefono) {
		store.remove(telefono);
	}
}
