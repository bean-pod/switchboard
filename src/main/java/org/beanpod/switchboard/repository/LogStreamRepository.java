package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.StreamLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogStreamRepository extends JpaRepository<StreamLogEntity, Long> {

  StreamLogEntity save(StreamLogEntity logEntity);

  List<StreamLogEntity> findByStreamId(String streamId);
}
