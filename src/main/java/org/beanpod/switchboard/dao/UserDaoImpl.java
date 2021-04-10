package org.beanpod.switchboard.dao;

import java.util.Optional;
import javax.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.dto.mapper.UserMapper;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.UserRepository;
import org.openapitools.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDaoImpl {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public UserDto save(UserModel userModel) {
    if (userRepository.findByUsername(userModel.getUsername()).isPresent()) {
      throw new ValidationException("Username exists!");
    }
    return userMapper.toUserDto(userRepository.save(userMapper.toUserEntity(userModel)));
  }

  public UserDetails loadUserByUsername(String username) {
    final Optional<UserEntity> optionalUser = userRepository.findByUsername(username);
    if (optionalUser.isPresent()) {
      return new SwitchBoardUserDetails(optionalUser.get());
    } else {
      throw new UsernameNotFoundException("Bad Credentials");
    }
  }

  public UserEntity findUser(String username) {
    final Optional<UserEntity> optionalUser = userRepository.findByUsername(username);
    if (optionalUser.isPresent()) {
      return optionalUser.get();
    } else {
      throw new UsernameNotFoundException("User does not exist");
    }
  }
}
