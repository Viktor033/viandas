// auth.controller.ts o auth.routes.ts
import express from 'express';
const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  // Validación básica
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Número inválido' });
  }

  // Simulación de envío de OTP (reemplazá con Twilio, Firebase, etc.)
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(`Enviando OTP ${otp} al número ${phone}`);

  // Guardar el OTP en memoria, base de datos o cache (ejemplo simple)
  // otpStore[phone] = otp;

  return res.status(200).json({ message: 'OTP enviado' });
});
