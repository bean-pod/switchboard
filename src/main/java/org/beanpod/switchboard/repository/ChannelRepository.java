package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<ChannelEntity, Long> {

  ChannelEntity save(ChannelEntity channel);

  List<ChannelEntity> findAll();

  Optional<ChannelEntity> findChannelEntityById(Long id);

  Long deleteChannelEntityById(Long id);
}
