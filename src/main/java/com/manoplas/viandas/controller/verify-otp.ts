router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;

  // Validación básica
  if (!phone || !code) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Verificación simulada (reemplazá con lógica real)
  // const validOtp = otpStore[phone];
  // if (code !== validOtp) return res.status(401).json({ error: 'Código inválido' });

  // Simulación de éxito
  const token = 'mocked-jwt-token';
  return res.status(200).json({ token });
});
