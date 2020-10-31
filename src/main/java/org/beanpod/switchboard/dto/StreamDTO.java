package org.beanpod.switchboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class StreamDTO {
    private Long id;
    private EncoderDTO encoder;
    private DecoderDTO decoder;
}
