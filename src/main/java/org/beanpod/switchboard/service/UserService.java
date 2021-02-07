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

  void sendConfirmationMail(String userMail, String token) {

    final SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(userMail);
    mailMessage.setSubject("Mail Confirmation Link!");
    mailMessage.setFrom("<MAIL>");
    mailMessage.setText(
        "Thank you for registering. Please click on the below link to activate your account." + "http://localhost:8080/sign-up/confirm?token="
            + token);

    emailSenderService.sendEmail(mailMessage);
  }

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
