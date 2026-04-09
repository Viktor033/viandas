package com.manoplas.viandas.config;

import com.manoplas.viandas.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;

	public JwtAuthenticationFilter(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain)
			throws ServletException, IOException {

		final String authHeader = request.getHeader("Authorization");

		// Si no hay Authorization o no empieza con "Bearer ", sigue la cadena sin autenticar
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		// Extrae el token sin el prefijo "Bearer "
		final String jwt = authHeader.substring(7);

		// Valida el token con JwtService
		if (jwtService.validarToken(jwt)) {
			// Si es válido, extrae el "subject" (tu teléfono) del token
			String telefono = jwtService.extraerTelefono(jwt);

			// Crea un Authentication y lo setea en el contexto
			UsernamePasswordAuthenticationToken authentication =
					new UsernamePasswordAuthenticationToken(telefono, null, null);

			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		// Continúa con el resto de filtros
		filterChain.doFilter(request, response);
	}
}
