package org.beanpod.switchboard.service;

import java.util.Optional;
import lombok.AllArgsConstructor;
import org.beanpod.switchboard.entity.ConfirmationTokenEntity;
import org.beanpod.switchboard.repository.ConfirmationTokenRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
class ConfirmationTokenService {

  private final ConfirmationTokenRepository confirmationTokenRepository;

  void saveConfirmationToken(ConfirmationTokenEntity confirmationToken) {

    confirmationTokenRepository.save(confirmationToken);
  }

  void deleteConfirmationToken(Long id) {

    confirmationTokenRepository.deleteById(id);
  }


  Optional<ConfirmationTokenEntity> findConfirmationTokenByToken(String token) {

    return confirmationTokenRepository.findConfirmationTokenByConfirmationToken(token);
  }

}