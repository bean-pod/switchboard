package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<ChannelEntity, Long> {
    List<ChannelEntity> findAll();

    ChannelEntity save(ChannelEntity channel);

    Optional<ChannelEntity> findChannelEntitiesById(Long id);

    Long deleteChannelEntitiesById(Long id);
}
