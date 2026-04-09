package com.manoplas.viandas.service;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class TwilioService {

	@Value("${twilio.account.sid}")
	private String accountSid;

	@Value("${twilio.auth.token}")
	private String authToken;

	@Value("${twilio.verify.sid}")
	private String verifySid;

	@PostConstruct
	public void init() {
		Twilio.init(accountSid, authToken);
	}

	public void enviarOtp(String telefono) {
		Verification.creator(verifySid, telefono, "sms").create();
	}

	public boolean verificarOtp(String telefono, String codigo) {
		VerificationCheck check = VerificationCheck.creator(
				verifySid,
				codigo
		).setTo("+549" + telefono).create();

		return "approved".equals(check.getStatus());
	}
}
