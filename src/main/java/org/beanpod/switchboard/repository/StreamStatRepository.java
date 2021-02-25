package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.StreamStatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StreamStatRepository extends JpaRepository<StreamStatEntity, Long> {
  StreamStatEntity saveStat(StreamStatEntity streamStatEntity);
}
