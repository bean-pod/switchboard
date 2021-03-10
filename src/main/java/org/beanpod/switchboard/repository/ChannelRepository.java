package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

// I'm confused as to why channel management is not a device management responsibility
// If channels are standalone objects to be manipulated on their own,
// channel ownership becomes difficult to establish or enforce

public interface ChannelRepository extends JpaRepository<ChannelEntity, Long> {

  ChannelEntity save(ChannelEntity channel);

  List<ChannelEntity> findAll();
  Optional<ChannelEntity> findChannelEntitiesById(Long id);
  Long deleteChannelEntitiesById(Long id);
}
