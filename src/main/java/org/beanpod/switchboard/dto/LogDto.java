package org.beanpod.switchboard.dto;

import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class LogDto {

  private Long id;

  private OffsetDateTime dateTime;

  private String message;

  private String level;
}
