package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.StreamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamRepository extends JpaRepository<StreamEntity, Long> {

  @Query("SELECT id FROM Stream")
  List<Long> getAllId();

  @Query(
      "SELECT count(id)>0 FROM Stream where input_channel_id = :inputChannelId AND output_channel_id = :outputChannelId")
  boolean existsDuplicate(
      @Param(value = "inputChannelId") long inputChannelId,
      @Param(value = "outputChannelId") long outputChannelId);
}
