package org.beanpod.switchboard.service;

import java.text.MessageFormat;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.UserRepository;
import org.openapitools.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final UserDaoImpl userDao;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public UserDetails loadUserByUsername(String email) {
    final Optional<UserEntity> optionalUser = userRepository.findByUsername(email);
    if (optionalUser.isPresent()) {
      return new SwitchBoardUserDetails(optionalUser.get());
    } else {
      throw new UsernameNotFoundException(
          MessageFormat.format("User with username {0} cannot be found.", email));
    }
  }

  public UserDto signUpUser(UserModel user) {
    String password = user.getPassword();
    final String encryptedPassword = bCryptPasswordEncoder.encode(password);
    user.setPassword(encryptedPassword);
    return userDao.save(user);
  }
}
