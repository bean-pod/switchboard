package org.beanpod.switchboard.config;

import javax.validation.ValidationException;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.beanpod.switchboard.service.UserService;
import org.openapitools.model.UserModel;
import org.openapitools.model.UserModel.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@AllArgsConstructor
@Log
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserService userService;

  private final BCryptPasswordEncoder bcryptPasswordEncoder;

  private final SecurityProperties securityProperties;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors()
        .and()
        .csrf()
        .disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers("/user/**")
        .hasAnyAuthority("ADMIN", "SUPERUSER")
        .antMatchers("/**")
        .hasAnyAuthority("USER", "SUPERUSER")
        .anyRequest()
        .authenticated()
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(authenticationEntryPoint())
        .and()
        .addFilter(new JwtAuthenticationFilter(authenticationManagerBean(), securityProperties))
        .addFilter(new JwtAuthorizationFilter(authenticationManagerBean(), securityProperties));
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    UserModel superuser =
        new UserModel()
            .username(securityProperties.getSuperuserUsername())
            .password(securityProperties.getSuperuserPassword())
            .userRole(UserRoleEnum.SUPERUSER);
    try {
      userService.signUpUser(superuser);
    } catch (ValidationException validationException) {
      log.info(validationException.getMessage());
    }

    auth.userDetailsService(userService).passwordEncoder(bcryptPasswordEncoder);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    final CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
    corsConfiguration.addAllowedMethod("DELETE");
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  public AuthenticationEntryPoint authenticationEntryPoint() {
    return new CustomAuthenticationEntryPoint();
  }
}
