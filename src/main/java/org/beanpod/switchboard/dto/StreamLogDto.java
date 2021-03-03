package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.validation.constraints.NotNull;
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
public class StreamLogDto {
  private Long id;

  // second device
  @NotNull private String serialNumber;

  @NotNull private String streamId;

  @JsonIgnoreProperties("log_id")
  private LogDto logDto;
}
