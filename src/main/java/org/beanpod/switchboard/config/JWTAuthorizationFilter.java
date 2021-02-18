package org.beanpod.switchboard.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

import static org.beanpod.switchboard.config.SecurityProperties.AUTHORIZATION_HEADER_STRING;
import static org.beanpod.switchboard.config.SecurityProperties.BEARER_TOKEN_PREFIX;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    private final SecurityProperties securityProperties;
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, SecurityProperties securityProperties) {
        super(authenticationManager);
        this.securityProperties = securityProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
         Optional.of(request)
            .map(r ->
                    r.getHeader(AUTHORIZATION_HEADER_STRING)
            )
            .filter( header ->
                    header.startsWith(BEARER_TOKEN_PREFIX)
            ).map(
                    this::getAuthorizationToken
            ).ifPresent( authenticationToken ->
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken)
            );

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthorizationToken(String token){
        return Optional.of(
                JWT.require(Algorithm.HMAC512(securityProperties.getSecret()))
                    .build()
                    .verify(token.replace(BEARER_TOKEN_PREFIX, ""))
                    .getSubject()
            ).map( user ->
                new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>())
            ).orElse(null);
    }
}
