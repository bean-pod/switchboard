package org.beanpod.switchboard.service;

import java.text.MessageFormat;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.entity.ConfirmationTokenEntity;
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
  private final ConfirmationTokenService confirmationTokenService;
  private final EmailSenderService emailSenderSevice;

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


  public void signUpUser(UserEntity user) {

    final String encryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());

    user.setPassword(encryptedPassword);

    final UserEntity createdUser = userRepository.save(user);

    final ConfirmationTokenEntity confirmationToken = new ConfirmationTokenEntity(user);

    confirmationTokenService.saveConfirmationToken(confirmationToken);

    sendConfirmationMail(user.getEmail(), confirmationToken.getConfirmationToken());

  }

}
