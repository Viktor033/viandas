package com.manoplas.viandas.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final String UPLOAD_DIR = "uploads";

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String originalName = StringUtils.cleanPath(file.getOriginalFilename());

            // Sanitizar: reemplazar espacios y caracteres problemáticos por guión bajo
            String safeName = originalName.replaceAll("\\s+", "_")
                    .replaceAll("[^a-zA-Z0-9._\\-]", "_");

            // Generar nombre único
            String uniqueFileName = UUID.randomUUID().toString() + "_" + safeName;

            saveFile(UPLOAD_DIR, uniqueFileName, file);

            String fileUrl = "/images/" + uniqueFileName;
            return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error al subir imagen: " + e.getMessage()));
        }
    }

    private void saveFile(String uploadDir, String fileName, MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}
