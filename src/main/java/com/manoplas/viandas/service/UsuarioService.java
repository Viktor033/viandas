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
        // Verificar si existe por teléfono
        Optional<Usuario> existingUser = usuarioRepository.findByTelefono(usuario.getTelefono());

        if (existingUser.isPresent()) {
            Usuario existing = existingUser.get();
            // Permitir edición del mismo usuario
            if (usuario.getId() != null && usuario.getId().equals(existing.getId())) {
                // Continuar normal
            } else if (Boolean.TRUE.equals(existing.getActivo())) {
                // Existe y esta ACTIVO -> Error
                throw new RuntimeException("El teléfono " + usuario.getTelefono() + " ya está en uso.");
            } else {
                // Existe y esta INACTIVO -> Reactivar
                System.out.println("REACTIVANDO USUARIO: " + existing.getNombre());
                existing.setActivo(true);
                existing.setNombre(usuario.getNombre());
                existing.setApellido(usuario.getApellido());
                existing.setDireccion(usuario.getDireccion());
                existing.setEmail(usuario.getEmail());
                existing.setZona(usuario.getZona());
                // Actualizar otros campos necesarios
                return usuarioRepository.save(existing);
            }
        }

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
        System.out.println("INTENTANDO SOFT DELETE PARA ID: " + id);
        usuarioRepository.findById(id).ifPresent(user -> {
            user.setActivo(false);
            usuarioRepository.save(user);
            System.out.println("SOFT DELETE EXITOSO PARA: " + user.getNombre());
        });
    }
}
