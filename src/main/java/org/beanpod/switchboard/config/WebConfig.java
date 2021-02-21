package org.beanpod.switchboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class WebConfig {

  @Bean
  public BCryptPasswordEncoder bcryptPasswordEncoder() {

    return new BCryptPasswordEncoder();
  }
}
