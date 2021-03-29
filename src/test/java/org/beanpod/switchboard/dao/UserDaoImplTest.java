package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import javax.validation.ValidationException;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.dto.mapper.UserMapper;
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

class UserDaoImplTest {

  private static UserModel userModel;
  private static UserEntity userEntity1;
  private static UserDto userDto;
  private static UserEntity userEntity;
  @InjectMocks private UserDaoImpl userDaoImpl;
  @Mock private UserRepository userRepository;
  @Mock private UserMapper userMapper;

  @BeforeEach
  void setupUserFixture() {
    userModel = UserFixture.getUserModel();
    userEntity1 = UserFixture.getUserEntity();
    userDto = UserFixture.getUserDto();
    userEntity = UserFixture.getUserEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testSave() {
    when(userMapper.toUserEntity(any(UserModel.class))).thenReturn(userEntity);
    when(userMapper.toUserDto(any(UserEntity.class))).thenReturn(userDto);
    when(userRepository.save(any())).thenReturn(userEntity);

    UserDto response = userDaoImpl.save(userModel);
    assertEquals("moh@gmail.com", response.getUsername());
  }

  @Test
  final void testSaveException() {
    Optional<UserEntity> user = Optional.of(userEntity);
    when(userRepository.findByUsername(any())).thenReturn(user);
    assertThrows(ValidationException.class, () -> userDaoImpl.save(userModel));
  }

  @Test
  final void testLoadUserByUserName() {
    Optional<UserEntity> userEntity = Optional.of(userEntity1);
    when(userRepository.findByUsername(any())).thenReturn(userEntity);
    userDaoImpl.loadUserByUsername("moh@gmail.com");
    verify(userRepository).findByUsername("moh@gmail.com");
  }

  @Test
  final void testLoadUserByUserNameException() {
    Optional<UserEntity> empty = Optional.empty();
    when(userRepository.findByUsername(any())).thenReturn(empty);
    assertThrows(
        UsernameNotFoundException.class, () -> userDaoImpl.loadUserByUsername("moh1@gmail.com"));
  }
}
