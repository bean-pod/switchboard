package org.beanpod.switchboard.service;

import java.text.MessageFormat;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public UserDetails loadUserByUsername(String email){

    final Optional<UserEntity> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    else {
      throw new UsernameNotFoundException(
          MessageFormat.format("User with email {0} cannot be found.", email));
    }
  }


  public UserEntity signUpUser(UserEntity user) {

    final String encryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());

    user.setPassword(encryptedPassword);

    final UserEntity createdUser = userRepository.save(user);

    return createdUser;
  }

}
