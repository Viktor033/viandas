package com.manoplas.viandas.config;

import com.manoplas.viandas.model.Usuario;
import com.manoplas.viandas.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

public class PhoneAuthFilter extends OncePerRequestFilter {

    private final UsuarioRepository usuarioRepository;

    public PhoneAuthFilter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.equals("/api/pedidos/con-dias") || path.equals("/api/v2/pedidos/con-dias")) {
            filterChain.doFilter(request, response);
            return;
        }

        String phone = request.getHeader("X-Auth-Phone");
        // Log para depuración en producción
        if (phone != null) {
            System.out.println("PHONE FILTER - Header Recibido: " + phone);
        }

        if (phone != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<Usuario> userOpt = usuarioRepository.findByTelefono(phone);

            if (userOpt.isPresent()) {
                Usuario user = userOpt.get();
                System.out.println("PHONE FILTER - Usuario encontrado: " + user.getTelefono() + " con rol: " + user.getRol());
                String rol = "ROLE_" + (user.getRol() != null ? user.getRol() : "USER");

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user.getTelefono(),
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(rol)));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println("PHONE FILTER - Usuario NO encontrado para el teléfono: " + phone);
            }
        }

        filterChain.doFilter(request, response);
    }
}
