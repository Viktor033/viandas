package com.manoplas.viandas.controller;

import com.manoplas.viandas.dto.LoginRequest;
import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByTelefono(loginRequest.getTelefono());

        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(401).body("Usuario no encontrado");
        }
    }
}
