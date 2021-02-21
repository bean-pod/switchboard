package org.beanpod.switchboard.fixture;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.entity.LogEntity;
import org.openapitools.model.CreateLogRequest;
import org.openapitools.model.LogModel;

public class LogFixture {

  public static final Long id = (long) 1;
  public static final OffsetDateTime dateTime =
      OffsetDateTime.of(LocalDateTime.of(2017, 05, 12, 05, 45), ZoneOffset.ofHoursMinutes(0, 0));
  public static final String message = "data inserted";
  public static final String level = "info";

  public static LogModel getLogModel() {
    return new LogModel().id(id).dateTime(dateTime).message(message).level(level)
        .serialNumber(DeviceFixture.SERIAL_NUMBER);
  }

  public static LogEntity getLogEntity() {
    return LogEntity.builder()
        .id(id)
        .dateTime(dateTime)
        .message(message)
        .level(level)
        .serialNumber(DeviceFixture.SERIAL_NUMBER)
        .build();
  }

  public static LogDto getLogDto() {
    return LogDto.builder()
        .id(id)
        .dateTime(dateTime)
        .message(message)
        .level(level)
        .serialNumber(DeviceFixture.SERIAL_NUMBER)
        .build();
  }

  public static CreateLogRequest getCreateLogRequest() {
    return new CreateLogRequest()
        .serialNumber(DeviceFixture.SERIAL_NUMBER)
        .level(level)
        .message(message)
        .dateTime("2017-05-12T05:45:00+00:00");
  }

  public static List<LogModel> getListOfLogs() {
    List<LogModel> listOfLogs = new ArrayList<>();
    listOfLogs.add(getLogModel());
    return listOfLogs;
  }

  public static List<LogEntity> getListOfLogEntity() {
    List<LogEntity> listOfLogs = new ArrayList<>();
    listOfLogs.add(getLogEntity());
    return listOfLogs;
  }
}
