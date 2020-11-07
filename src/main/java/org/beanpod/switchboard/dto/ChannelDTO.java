package org.beanpod.switchboard.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChannelDTO {
    private Long id;
    private String name;
    private int port;
    private EncoderDTO encoder;
    private DecoderDTO decoder;
}
