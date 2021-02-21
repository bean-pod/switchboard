package org.beanpod.switchboard.config;

import static org.beanpod.switchboard.config.SecurityProperties.AUTHORIZATION_HEADER_STRING;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.beanpod.switchboard.exceptions.ExceptionType.CouldNotAuthenticateUserException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationFilterTest {

  public JwtAuthenticationFilter jwtAuthenticationFilter;
  @Mock public AuthenticationManager authenticationManager;
  @Mock public SecurityProperties securityProperties;
  @Mock public HttpServletRequest httpServletRequest;
  @Mock public HttpServletResponse httpServletResponse;
  @Mock public Authentication authentication;
  @Mock public AuthenticationException authenticationException;

  @BeforeEach
  public void setup() {
    initMocks(this);
    when(securityProperties.getAuthenticationUrl()).thenReturn("/login");
    jwtAuthenticationFilter =
        new JwtAuthenticationFilter(authenticationManager, securityProperties);
  }

  @Test
  public void testSuccessfulAttemptAuthentication() {
    String expectedUsername = "user";
    String expectedPass = "pass";
    String header = "Basic dXNlcjpwYXNz";

    when(httpServletRequest.getHeader(AUTHORIZATION_HEADER_STRING)).thenReturn(header);
    UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(expectedUsername, expectedPass);
    when(authenticationManager.authenticate(token)).thenReturn(authentication);

    Authentication result =
        jwtAuthenticationFilter.attemptAuthentication(httpServletRequest, httpServletResponse);

    assertEquals(result, authentication);
  }

  @Test
  public void testFailureAttemptAuthentication() {
    String expectedUsername = "user";
    String expectedPass = "pass";
    String header = "Basic dXNlcjpwYXNz";

    when(httpServletRequest.getHeader(AUTHORIZATION_HEADER_STRING)).thenReturn(header);
    UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(expectedUsername, expectedPass);
    when(authenticationManager.authenticate(token)).thenThrow(authenticationException);

    assertThrows(
        CouldNotAuthenticateUserException.class,
        () ->
            jwtAuthenticationFilter.attemptAuthentication(httpServletRequest, httpServletResponse));
  }
}
