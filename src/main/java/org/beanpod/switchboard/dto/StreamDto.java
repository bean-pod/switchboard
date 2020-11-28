package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamDto {
  private Long id;
  private OutputChannelDto outputChannel;
  private InputChannelDto inputChannel;
}
