package org.beanpod.switchboard.dto;

import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.beanpod.switchboard.entity.StreamLog;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogDto {

  private Long id;

  private OffsetDateTime dateTime;

  private String message;

  private String level;

  private String serialNumber;

  private StreamLog streamLog;

  // for backward compatibility
  public LogDto(
      Long id, OffsetDateTime dateTime, String message, String level, String serialNumber) {
    this.id = id;
    this.dateTime = dateTime;
    this.message = message;
    this.level = level;
    this.serialNumber = serialNumber;
  }
}
