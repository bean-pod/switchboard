package org.beanpod.switchboard.dto;

import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.beanpod.switchboard.entity.StreamLog;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class LogDto {

  @NonNull private Long id;

  @NonNull private OffsetDateTime dateTime;

  @NonNull private String message;

  @NonNull private String level;

  @NonNull private String serialNumber;

  private StreamLog streamLog;
}
