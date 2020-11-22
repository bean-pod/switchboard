package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class InputChannelDTO {
    @NotNull
    private Long id;
    private ChannelDTO channel;
    @JsonBackReference
    private DecoderDTO decoder;
}
