package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.StreamLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LogStreamRepository extends JpaRepository<StreamLogEntity, Long> {

  StreamLogEntity save(StreamLogEntity logEntity);

  @Query(
      value =
          "select lo.id, lo.level, lo.message, lo.serial_number, "
              + "lo.date_time, st.log_id, st.serial_number, st.stream_id "
              + "from log_entity lo, user us, device de, stream_log st "
              + "where us.id = de.user_id and us.id = :id and de.serial_number = lo.serial_number "
              + "and lo.id = st.log_id and st.stream_id = :streamId",
      nativeQuery = true)
  List<StreamLogEntity> findByStreamId(@Param("streamId") String streamId, @Param("id") Long userId);
}
