package com.manoplas.viandas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapea /images/** a la carpeta ./uploads/ usando URI correcta (cross-platform)
        Path uploadDir = Paths.get("uploads").toAbsolutePath();

        // Crear directorio si no existe para evitar errores en el arranque
        try {
            Files.createDirectories(uploadDir);
        } catch (Exception ignored) {
        }

        // Path.toUri() genera la URI correcta tanto en Windows como en Linux/Docker
        // Ej: file:///app/uploads/ en Linux, file:///C:/PROYECTOS/viandas/uploads/ en
        // Windows
        String uploadLocation = uploadDir.toUri().toString();
        if (!uploadLocation.endsWith("/")) {
            uploadLocation += "/";
        }

        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadLocation);

        // Fallback para archivos estáticos del frontend (Angular)
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0);
    }
}
