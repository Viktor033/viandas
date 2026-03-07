package com.manoplas.viandas.config;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository repository) {
        return args -> {
            // Migración segura: buscar todos los posibles admins antiguos y actualizarlos
            // evitando duplicados si el destino (231508) ya existe o si hay varios orígenes.
            final String TARGET_PHONE = "231508";
            java.util.List<Usuario> adminsToUpdate = repository.findAll().stream()
                .filter(u -> "ADMIN".equals(u.getRol()) && ("1111111111".equals(u.getTelefono()) || "3794920999".equals(u.getTelefono())))
                .collect(java.util.stream.Collectors.toList());

            java.util.Optional<Usuario> currentAdmin = repository.findByTelefono(TARGET_PHONE);

            for (Usuario oldAdmin : adminsToUpdate) {
                if (currentAdmin.isPresent()) {
                    // Si ya existe el admin con el nuevo número, borramos el viejo para evitar NonUniqueResultException
                    repository.delete(oldAdmin);
                    System.out.println("Migración: Admin duplicado eliminado.");
                } else {
                    oldAdmin.setTelefono(TARGET_PHONE);
                    repository.save(oldAdmin);
                    currentAdmin = java.util.Optional.of(oldAdmin);
                    System.out.println("Migración: Admin actualizado a " + TARGET_PHONE);
                }
            }

            if (repository.count() == 0 || (repository.count() == 1 && adminsToUpdate.isEmpty() && currentAdmin.isEmpty())) {
                // Admin User default if none exists
                Usuario admin = new Usuario();
                admin.setNombre("Admin");
                admin.setApellido("Super");
                admin.setTelefono(TARGET_PHONE);
                admin.setRol("ADMIN");
                admin.setActivo(true);
                admin.setFechaRegistro(java.time.LocalDate.now());
                repository.save(admin);
                System.out.println("Base de datos inicializada. Admin (231508) creado.");
            }
        };
    }
}
