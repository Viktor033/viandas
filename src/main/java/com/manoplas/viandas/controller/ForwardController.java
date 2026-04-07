package com.manoplas.viandas.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Reenvía todas las rutas que no son de la API ni archivos estáticos hacia
 * index.html.
 * Esto permite que Angular maneje el enrutamiento del lado del cliente (SPA).
 */
@Controller
public class ForwardController implements ErrorController {

    /**
     * Captura errores (404, etc.) y reenvía a index.html para que Angular los
     * maneje, PERO solo si no es una ruta de la API.
     */
    @RequestMapping(value = "/error")
    public String error(HttpServletRequest request) {
        String uri = (String) request.getAttribute("jakarta.servlet.error.request_uri");
        if (uri != null && uri.startsWith("/api")) {
            // Si el error es en la API, devolvemos el error tal cual
            return null; // Deja que Spring maneje el error por defecto para la API
        }
        return "forward:/index.html";
    }

    /**
     * Captura todas las rutas que no empiezan con /api/ ni son archivos estáticos
     * y las reenvía a index.html para que Angular maneje el routing.
     */
    @RequestMapping(value = {
            "/login", "/home", "/menu", "/mis-pedidos", "/perfil",
            "/admin/pedidos", "/admin/clientes", "/admin/cadetes",
            "/configuracion", "/pago-exitoso", "/pago-fallido", "/pago-pendiente",
            "/admin/**"
    })
    public String forward(HttpServletRequest request) {
        String uri = request.getRequestURI();
        if (uri != null && uri.startsWith("/api")) {
            return null; 
        }
        return "forward:/index.html";
    }
}
