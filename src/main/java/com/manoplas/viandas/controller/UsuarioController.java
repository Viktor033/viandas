package com.manoplas.viandas.controller;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> getAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable Long id) {
        return usuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Usuario usuario) {
        if (usuarioService.findByTelefono(usuario.getTelefono()).isPresent()) {
            return ResponseEntity.badRequest().body("{\"message\": \"El teléfono ya está registrado\"}");
        }
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @RequestBody Usuario userDetails) {
        return usuarioService.findById(id)
                .map(user -> {
                    user.setNombre(userDetails.getNombre());
                    user.setApellido(userDetails.getApellido());
                    user.setTelefono(userDetails.getTelefono());
                    user.setRol(userDetails.getRol());
                    user.setActivo(userDetails.getActivo());

                    // Campos nuevos de Cliente
                    user.setZona(userDetails.getZona());
                    user.setDireccion(userDetails.getDireccion());
                    user.setPiso(userDetails.getPiso());
                    user.setDepartamento(userDetails.getDepartamento());
                    user.setObservaciones(userDetails.getObservaciones());
                    user.setCadete(userDetails.getCadete());

                    return ResponseEntity.ok(usuarioService.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
