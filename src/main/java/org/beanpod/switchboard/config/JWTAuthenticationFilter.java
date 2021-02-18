package org.beanpod.switchboard.config;

import com.auth0.jwt.JWT;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.exceptions.ExceptionType.CouldNotAuthenticateUserException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static org.beanpod.switchboard.config.SecurityProperties.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final SecurityProperties securityProperties;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, SecurityProperties securityProperties) {
        this.authenticationManager = authenticationManager;
        this.securityProperties = securityProperties;
        setFilterProcessesUrl(securityProperties.getAuthenticationUrl());
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            var authorizationHeader = request.getHeader(AUTHORIZATION_HEADER_STRING);
            var encodedCredentials = authorizationHeader.substring(BASIC_AUTHENTICATION_PREFIX.length()).trim();
            String decodedCredentials = new String(Base64.getDecoder().decode(encodedCredentials), StandardCharsets.UTF_8);
            String[] credentials = decodedCredentials.split(":");

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials[0],
                            credentials[1]
                    )
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw new CouldNotAuthenticateUserException();
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        String username = ((SwitchBoardUserDetails) authResult.getPrincipal()).getUsername();
        String token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + securityProperties.getExpirationTime()))
                .sign(HMAC512(securityProperties.getSecret().getBytes()));
        response.addHeader(AUTHORIZATION_HEADER_STRING, BEARER_TOKEN_PREFIX + token);
    }
}
