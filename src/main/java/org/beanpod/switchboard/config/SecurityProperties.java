package org.beanpod.switchboard.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class SecurityProperties {

  @Value("${security.authentication.jwt.expirationtime}")
  private final long expirationTime = 86_400_000; // 1 day

  @Value("${security.authentication.jwt.secret}")
  private String secret;

  @Value("${security.authentication.url}")
  private final String authenticationUrl = "/login";

  @Value("${security.authentication.superuser.username}")
  private String superuserUsername;

  @Value("${security.authentication.superuser.password}")
  private String superuserPassword;

  public static final String AUTHORIZATION_HEADER_STRING = "Authorization";

  public static final String BEARER_TOKEN_PREFIX = "Bearer ";

  public static final String BASIC_AUTHENTICATION_PREFIX = "Basic ";
}
