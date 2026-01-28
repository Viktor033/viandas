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

        String phone = request.getHeader("X-Auth-Phone");

        if (phone != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<Usuario> userOpt = usuarioRepository.findByTelefono(phone);

            if (userOpt.isPresent()) {
                Usuario user = userOpt.get();
                // Asignar rol. Asegurarse que el rol tenga el prefijo ROLE_ si Spring Security
                // lo requiere por defecto,
                // o usar AuthorityUtils.
                String rol = "ROLE_" + (user.getRol() != null ? user.getRol() : "USER");

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user.getEmail(), // Principal (usamos email para compatibilidad con PedidoService)
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(rol)));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
