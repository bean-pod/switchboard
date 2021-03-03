package org.beanpod.switchboard.config;

import static org.beanpod.switchboard.config.SecurityProperties.AUTHORIZATION_HEADER_STRING;
import static org.beanpod.switchboard.config.SecurityProperties.BEARER_TOKEN_PREFIX;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  private final SecurityProperties securityProperties;

  public JwtAuthorizationFilter(
      AuthenticationManager authenticationManager, SecurityProperties securityProperties) {
    super(authenticationManager);
    this.securityProperties = securityProperties;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    Optional.of(request)
        .map(r -> r.getHeader(AUTHORIZATION_HEADER_STRING))
        .filter(header -> header.startsWith(BEARER_TOKEN_PREFIX))
        .map(this::getAuthorizationToken)
        .ifPresent(
            authenticationToken ->
                SecurityContextHolder.getContext().setAuthentication(authenticationToken));

    chain.doFilter(request, response);
  }

  private UsernamePasswordAuthenticationToken getAuthorizationToken(String token) {
    return Optional.of(
            JWT.require(Algorithm.HMAC512(securityProperties.getSecret()))
                .build()
                .verify(token.replace(BEARER_TOKEN_PREFIX, ""))
                .getClaims())
        .map(
            user ->
                new UsernamePasswordAuthenticationToken(
                    user.get("sub").asString(),
                    null,
                    new ArrayList<>(
                        Collections
                            .singletonList(new SimpleGrantedAuthority(user.get("role").asString())))))
        .orElse(null);
  }
}
