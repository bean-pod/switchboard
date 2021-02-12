package org.beanpod.switchboard.entity;

import java.util.Collection;
import java.util.Collections;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MyUserDetails implements UserDetails {

  @NotNull private String username;

  @NotNull private String password;

  @Builder.Default private UserRole userRole = UserRole.USER;

  public MyUserDetails(UserEntity userEntity) {
    this.username = userEntity.getUsername();
    this.password = userEntity.getPassword();
    this.userRole = userEntity.getUserRole();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    final SimpleGrantedAuthority simpleGrantedAuthority =
        new SimpleGrantedAuthority(userRole.name());
    return Collections.singletonList(simpleGrantedAuthority);
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
