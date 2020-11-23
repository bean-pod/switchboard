package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class InputChannelDTO {
  @NotNull private Long id;
  private ChannelDTO channel;
  @JsonBackReference private DecoderDTO decoder;
}
