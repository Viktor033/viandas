package com.manoplas.viandas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @GetMapping("/static-files")
    public List<String> listStaticFiles() {
        List<String> fileNames = new ArrayList<>();
        try {
            ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resources = resolver.getResources("classpath*:/static/**");
            for (Resource resource : resources) {
                fileNames.add(resource.getURI().toString());
            }
        } catch (IOException e) {
            fileNames.add("Error: " + e.getMessage());
        }
        return fileNames;
    }
}
