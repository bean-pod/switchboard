package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.dto.mapper.UserMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.UserModel;

class UserDaoImplTest {

  private static UserModel userModel;
  private static UserDto userDto;
  private static UserEntity userEntity;
  @InjectMocks private UserDaoImpl userDaoImpl;
  @Mock private UserService userService;
  @Mock private UserMapper userMapper;

  @BeforeEach
  void setupUserFixture() {
    userModel = UserFixture.getUserModel();
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
    when(userService.signUpUser(any())).thenReturn(userEntity);

    UserDto response = userDaoImpl.save(userModel);
    assertEquals("moh@gmail.com", response.getUserName());
  }
}
