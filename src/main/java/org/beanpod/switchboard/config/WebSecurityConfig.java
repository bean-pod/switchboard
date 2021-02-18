package org.beanpod.switchboard.config;

import lombok.AllArgsConstructor;
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


@Configuration
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserService userService;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  private final SecurityProperties securityProperties;

  protected void configure(HttpSecurity http) throws Exception {
    http
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
    userService.signUpUser(superuser);
    auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
