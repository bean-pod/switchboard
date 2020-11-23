package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class InputChannelDTO {
    @NotNull
    private Long id;
    private ChannelDTO channel;
    @JsonBackReference
    private DecoderDTO decoder;
}
