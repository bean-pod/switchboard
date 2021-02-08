package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserServiceTest {

  @Mock private static UserEntity userEntity;
  private static UserEntity userEntity1;
  @InjectMocks private UserService userService;
  @Mock private UserRepository userRepository;
  @Mock private BCryptPasswordEncoder bCryptPasswordEncoder;

  @BeforeEach
  void setupUserFixture() {
    userEntity1 = UserFixture.getUserEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testLoadUserByUserName() {
    Optional<UserEntity> userEntity = Optional.of(userEntity1);
    when(userRepository.findByEmail(any())).thenReturn(userEntity);
    userService.loadUserByUsername("moh@gmail.com");
    verify(userRepository).findByEmail("moh@gmail.com");
  }

  @Test
  final void testLoadUserByUserNameException() {
    Optional<UserEntity> empty = Optional.empty();
    when(userRepository.findByEmail(any())).thenReturn(empty);
    assertThrows(
        UsernameNotFoundException.class,
        () -> {
          userService.loadUserByUsername("moh1@gmail.com");
        });
  }

  @Test
  final void testSignUpUser() {
    when(userEntity.getPassword()).thenReturn("1234.");
    when(bCryptPasswordEncoder.encode("1234.")).thenReturn("eow");
    when(userRepository.save(any())).thenReturn(userEntity1);

    UserEntity response = userService.signUpUser(userEntity1);
    assertEquals("eow", response.getPassword());
  }
}
