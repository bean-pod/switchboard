package org.beanpod.switchboard.fixture;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import org.openapitools.model.LogModel;

public class LogFixture {

  public static final Long id = (long)1;
  public static final OffsetDateTime dateTime = OffsetDateTime.of(LocalDateTime.of(2017, 05, 12, 05, 45),
      ZoneOffset.ofHoursMinutes(6, 30));
  public static final String message = "data inserted";
  public static final String level = "info";


  public static LogModel getLogModel(){
    return new LogModel()
        .id(id)
        .dateTime(dateTime)
        .message(message)
        .level(level);
  }

  public static List<LogModel> getListOfLogs() {
    List<LogModel> listOfLogs = new ArrayList<>();
    listOfLogs.add(getLogModel());
    return listOfLogs;
  }
  }
