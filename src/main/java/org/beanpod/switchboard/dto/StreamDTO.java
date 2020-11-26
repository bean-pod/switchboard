package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamDTO {
  private Long id;
  private OutputChannelDTO outputChannel;
  private InputChannelDTO inputChannel;
  private StreamModeDTO mode;
}
