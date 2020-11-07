package org.beanpod.switchboard.dto;

import lombok.*;
import org.hibernate.result.Output;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamDTO {
    private Long id;
    private OutputChannelDTO outputChannel;
    private InputChannelDTO inputChannel;
}
