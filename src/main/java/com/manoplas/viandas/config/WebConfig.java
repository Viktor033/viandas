package com.manoplas.viandas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapea /images/** a la carpeta ./uploads/ en la raíz del proyecto
        exposeDirectory("uploads", registry);

        // Fallback to default Spring Boot static file serving
        // (classpath:/META-INF/resources/, classpath:/resources/, classpath:/static/,
        // classpath:/public/)
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0); // Disable caching for development/debugging
    }

    private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get(dirName);
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        if (dirName.startsWith("../"))
            dirName = dirName.replace("../", "");

        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/" + uploadPath + "/");
    }
}
