package org.beanpod.switchboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StreamDTO {
    private Long id;
    private EncoderDTO encoder;
    private DecoderDTO decoder;
}
