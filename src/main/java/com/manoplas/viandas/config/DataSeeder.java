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
            // Migration: Update old admin phone if exists
            repository.findByTelefono("1111111111").ifPresent(oldAdmin -> {
                if ("ADMIN".equals(oldAdmin.getRol())) {
                    oldAdmin.setTelefono("231508");
                    repository.save(oldAdmin);
                    System.out.println("Migración: Admin actualizado de 1111111111 a 231508");
                }
            });

            // Migration: Update previous admin phone (3794920999) to new requested 231508
            repository.findByTelefono("3794920999").ifPresent(oldAdmin -> {
                if ("ADMIN".equals(oldAdmin.getRol())) {
                    oldAdmin.setTelefono("231508");
                    repository.save(oldAdmin);
                    System.out.println("Migración: Admin actualizado de 3794920999 a 231508");
                }
            });

            if (repository.count() == 0) {
                // Admin User
                Usuario admin = new Usuario();
                admin.setNombre("Admin");
                admin.setApellido("Super");
                admin.setTelefono("231508"); // Updated Admin Phone
                admin.setRol("ADMIN");
                admin.setActivo(true);
                admin.setFechaRegistro(LocalDate.now());
                repository.save(admin);

                System.out.println("Base de datos reiniciada. Solo existe Admin (231508).");
            }
        };
    }
}
