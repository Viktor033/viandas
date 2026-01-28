package com.manoplas.viandas.repository;

import com.manoplas.viandas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    java.util.Optional<Usuario> findByTelefono(String telefono);

    java.util.Optional<Usuario> findByEmail(String email);
}
