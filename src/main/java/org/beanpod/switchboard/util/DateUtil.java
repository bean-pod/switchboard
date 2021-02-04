package org.beanpod.switchboard.util;

import java.time.Instant;
import java.util.Date;
import org.springframework.stereotype.Component;

/**
 * Utility class that returns the date of the current time in UTC time zone.
 */
@Component
public class DateUtil {

  public Date getCurrentDate() {
    return Date.from(Instant.now());
  }
}
