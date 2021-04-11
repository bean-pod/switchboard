package org.beanpod.switchboard.fixture;

import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.util.Date;
import lombok.SneakyThrows;

public class DateFixture {
  private static final String DATE = "2020-10-31 05:05:05-00";
  private static final String OFFSET_DATE_TIME = "2020-10-31T05:05:05Z";
  private static final String pattern = "yyyy-MM-dd HH:mm:ssX";
  private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

  @SneakyThrows
  public static Date getDate() {
    return simpleDateFormat.parse(DATE);
  }

  public static OffsetDateTime getOffsetDateTime() {
    return OffsetDateTime.parse(OFFSET_DATE_TIME);
  }
}
