package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class OutputChannelDTO {
    @NotNull
    private Long id;
    private ChannelDTO channel;
    @JsonBackReference
    private EncoderDTO encoder;
}
