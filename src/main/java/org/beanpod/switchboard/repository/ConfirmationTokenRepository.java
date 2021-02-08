package org.beanpod.switchboard.repository;

import java.util.Optional;
import org.beanpod.switchboard.entity.ConfirmationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationTokenEntity, Long> {

  Optional<ConfirmationTokenEntity> findConfirmationTokenByConfirmationToken(String token);
}
