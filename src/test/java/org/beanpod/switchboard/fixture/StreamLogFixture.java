package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.entity.StreamLog;

public class StreamLogFixture {
  public static StreamLogDto getStreamLogDto(){
    return StreamLogDto.builder()
        .id(LogFixture.id)
        .serialNumber(DeviceFixture.SERIAL_NUMBER2)
        .streamId(String.valueOf(StreamFixture.ID))
        .logDto(LogFixture.getLogDto())
        .build();
  }

  public static StreamLog getStreamLog(){
    return StreamLog.builder()
        .id(LogFixture.id)
        .serialNumber(DeviceFixture.SERIAL_NUMBER2)
        .streamId(String.valueOf(StreamFixture.ID))
        .logEntity(LogFixture.getLogEntity())
        .build();
  }
}
