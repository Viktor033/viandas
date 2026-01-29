package com.manoplas.viandas.service;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // Método específico para listar solo clientes si fuera necesario en el futuro
    // public List<Usuario> findClientes() { return
    // usuarioRepository.findByRol("USUARIO"); }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> findByTelefono(String telefono) {
        return usuarioRepository.findByTelefono(telefono);
    }

    public Usuario save(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setFechaRegistro(LocalDate.now());
            if (usuario.getActivo() == null)
                usuario.setActivo(true);
            // Default role if not set
            if (usuario.getRol() == null)
                usuario.setRol("USUARIO");
        }
        return usuarioRepository.save(usuario);
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}
