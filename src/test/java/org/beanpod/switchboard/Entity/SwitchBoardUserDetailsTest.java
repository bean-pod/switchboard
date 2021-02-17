package org.beanpod.switchboard.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

class SwitchBoardUserDetailsTest {

  private static UserEntity userEntity = UserFixture.getUserEntity();

  @InjectMocks
  private SwitchBoardUserDetails switchBoardUserDetails = new SwitchBoardUserDetails(userEntity);

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void getAuthorities() {
    final SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("USER");
    assertEquals(
        switchBoardUserDetails.getAuthorities(), Collections.singletonList(simpleGrantedAuthority));
  }

  @Test
  void testGetPassword() {
    assertEquals("1234.", switchBoardUserDetails.getPassword());
  }

  @Test
  void testGetUserName() {
    assertEquals("moh@gmail.com", switchBoardUserDetails.getUsername());
  }

  @Test
  void testIsAccountNonExpired() {
    assertTrue(switchBoardUserDetails.isAccountNonExpired());
  }

  @Test
  void testIsAccountNonLocked() {
    assertTrue(switchBoardUserDetails.isAccountNonLocked());
  }

  @Test
  void testIsCredentialsNonExpired() {
    assertTrue(switchBoardUserDetails.isCredentialsNonExpired());
  }

  @Test
  void testIsEnabled() {
    assertTrue(switchBoardUserDetails.isEnabled());
  }
}
