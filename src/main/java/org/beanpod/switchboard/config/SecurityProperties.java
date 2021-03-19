package org.beanpod.switchboard.config;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Getter
public class SecurityProperties {

  private final String secret =
      System.getenv("JWT_SECRET") != null ? System.getenv("JWT_SECRET") : "switchboardsecret";

  private final String superuserUsername =
      System.getenv("SUPERUSER_USERNAME") != null ? System.getenv("SUPERUSER_USERNAME") : "admin";

  private final String superuserPassword =
      System.getenv("SUPERUSER_PASSWORD") != null ? System.getenv("SUPERUSER_PASSWORD") : "admin";

  public static final long EXPIRATION_TIME = 86_400_000; // 1 day

  public static final String AUTHENTICATION_URL = "/login";

  public static final String AUTHORIZATION_HEADER_STRING = "Authorization";

  public static final String BEARER_TOKEN_PREFIX = "Bearer ";

  public static final String BASIC_AUTHENTICATION_PREFIX = "Basic ";
}
