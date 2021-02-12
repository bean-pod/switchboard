package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.UserModel;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserServiceTest {

  private static UserEntity userEntity1;
  private static UserModel userModel1;
  private static UserDto userDto;
  @InjectMocks private UserService userService;
  @Mock private UserModel userModel;
  @Mock private UserDaoImpl userDao;
  @Mock private UserRepository userRepository;
  @Mock private BCryptPasswordEncoder bCryptPasswordEncoder;

  @BeforeEach
  void setupUserFixture() {
    MockitoAnnotations.initMocks(this);
    userEntity1 = UserFixture.getUserEntity();
    userModel1 = UserFixture.getUserModel();
    userDto = UserFixture.getUserDto();
  }

  @Test
  final void testLoadUserByUserName() {
    Optional<UserEntity> userEntity = Optional.of(userEntity1);
    when(userRepository.findByUsername(any())).thenReturn(userEntity);
    userService.loadUserByUsername("moh@gmail.com");
    verify(userRepository).findByUsername("moh@gmail.com");
  }

  @Test
  final void testLoadUserByUserNameException() {
    Optional<UserEntity> empty = Optional.empty();
    when(userRepository.findByUsername(any())).thenReturn(empty);
    assertThrows(
        UsernameNotFoundException.class,
        () -> {
          userService.loadUserByUsername("moh1@gmail.com");
        });
  }

  @Test
  final void testSignUpUser() {
    when(userModel.getPassword()).thenReturn("1234.");
    when(bCryptPasswordEncoder.encode("1234.")).thenReturn("eow");
    userDto.setPassword("eow");
    when(userDao.save(userModel1)).thenReturn(userDto);

    UserDto response = userService.signUpUser(userModel1);
    assertEquals("eow", response.getPassword());
  }
}
