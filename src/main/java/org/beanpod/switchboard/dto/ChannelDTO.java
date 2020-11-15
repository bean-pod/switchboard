package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelDTO {
    private Long id;
    private String name;
    private Integer port;
}
