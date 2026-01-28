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
@CrossOrigin(origins = "http://localhost:4200")
public class UploadController {

    // Guarda en la carpeta static del backend para ser servido
    // NOTA: En desarrollo, puede requerir reinicio o configurar un path externo.
    // Para simplificar, intentaremos guardar en target y src.

    private final String UPLOAD_DIR_SRC = "src/main/resources/static/images/productos/";
    private final String UPLOAD_DIR_TARGET = "target/classes/static/images/productos/";

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Generar nombre único para evitar colisiones
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

            // Guardar en SRC (para persistencia)
            saveFile(UPLOAD_DIR_SRC, uniqueFileName, file);

            // Guardar en TARGET (para disponibilidad inmediata en dev)
            saveFile(UPLOAD_DIR_TARGET, uniqueFileName, file);

            // URL relativa de acceso
            String fileUrl = "/images/productos/" + uniqueFileName;

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
