package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StreamDTO {
    private Long id;
    private EncoderDTO encoder;
    private DecoderDTO decoder;
}
