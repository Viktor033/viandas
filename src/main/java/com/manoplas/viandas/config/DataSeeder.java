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
            if (repository.count() == 0) {
                // Admin User
                Usuario admin = new Usuario();
                admin.setNombre("Admin");
                admin.setApellido("Super");
                admin.setTelefono("1111111111");
                admin.setRol("ADMIN");
                admin.setActivo(true);
                admin.setFechaRegistro(LocalDate.now());
                repository.save(admin);

                // Normal User
                Usuario user = new Usuario();
                user.setNombre("Pepe");
                user.setApellido("Cliente");
                user.setTelefono("2222222222");
                user.setRol("USUARIO");
                user.setActivo(true);
                user.setFechaRegistro(LocalDate.now());
                repository.save(user);

                System.out.println("Usuarios de prueba creados: Admin (1111111111), User (2222222222)");
            }
        };
    }
}
