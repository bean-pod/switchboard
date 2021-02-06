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
public class InputChannelDto {

  @NotNull private Long id;
  private ChannelDto channel;

  @JsonIgnoreProperties("input")
  private DecoderDto decoder;
}
