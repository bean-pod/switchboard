package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OutputChannelDTO {
    private Long id;
    private ChannelDTO channel;
    private EncoderDTO encoder;
}
