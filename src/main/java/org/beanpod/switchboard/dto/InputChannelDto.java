package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class InputChannelDto {

  @NotNull private Long id;
  private ChannelDto channel;

  @JsonIgnoreProperties("input")
  private DecoderDto decoder;
}
