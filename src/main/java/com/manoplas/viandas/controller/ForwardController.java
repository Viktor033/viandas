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
     * maneje.
     */
    @RequestMapping(value = "/error")
    public String error(HttpServletRequest request) {
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
    public String forward() {
        return "forward:/index.html";
    }
}
