package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.dto.mapper.UserMapper;
import org.beanpod.switchboard.service.UserService;
import org.openapitools.model.UserModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDaoImpl {

  private final UserService userService;
  private final UserMapper userMapper;

  public UserDto save(UserModel userModel) {
    return userMapper.toUserDto(userService.signUpUser(userMapper.toUserEntity(userModel)));
  }
}
