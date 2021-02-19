package org.beanpod.switchboard.config;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.beanpod.switchboard.service.UserService;
import org.openapitools.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.validation.ValidationException;


@Configuration
@AllArgsConstructor
@Log
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserService userService;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  private final SecurityProperties securityProperties;

  protected void configure(HttpSecurity http) throws Exception {
    http
        .cors()
      .and()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
        .authorizeRequests()
        .antMatchers("/user/sign-up")
        .permitAll()
        .anyRequest()
        .authenticated()
      .and()
        .addFilter(new JWTAuthenticationFilter(authenticationManagerBean(), securityProperties))
        .addFilter(new JWTAuthorizationFilter(authenticationManagerBean(), securityProperties));
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    UserModel superuser = new UserModel()
            .username(securityProperties.getSuperuserUsername())
            .password(securityProperties.getSuperuserPassword());
    try{
      userService.signUpUser(superuser);
    }catch (ValidationException validationException){
      log.info(validationException.getMessage());
    }

    auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
    return source;
  }
}
