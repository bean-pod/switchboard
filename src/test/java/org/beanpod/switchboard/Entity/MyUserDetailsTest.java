package org.beanpod.switchboard.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import org.beanpod.switchboard.entity.MyUserDetails;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

class MyUserDetailsTest {

  private static UserEntity userEntity = UserFixture.getUserEntity();

  @InjectMocks private MyUserDetails myUserDetails = new MyUserDetails(userEntity);

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void getAuthorities() {
    final SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("USER");
    assertEquals(myUserDetails.getAuthorities(), Collections.singletonList(simpleGrantedAuthority));
  }

  @Test
  void testGetPassword() {
    assertEquals("1234.", myUserDetails.getPassword());
  }

  @Test
  void testGetUserName() {
    assertEquals("moh@gmail.com", myUserDetails.getUsername());
  }

  @Test
  void testIsAccountNonExpired() {
    assertTrue(myUserDetails.isAccountNonExpired());
  }

  @Test
  void testIsAccountNonLocked() {
    assertTrue(myUserDetails.isAccountNonLocked());
  }

  @Test
  void testIsCredentialsNonExpired() {
    assertTrue(myUserDetails.isAccountNonExpired());
  }

  @Test
  void testIsEnabled() {
    assertTrue(myUserDetails.isEnabled());
  }
}
