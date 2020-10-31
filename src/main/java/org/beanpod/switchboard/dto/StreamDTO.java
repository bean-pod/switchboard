package org.beanpod.switchboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamDTO {
    private Long id;
    private EncoderDTO encoder;
    private DecoderDTO decoder;
}
