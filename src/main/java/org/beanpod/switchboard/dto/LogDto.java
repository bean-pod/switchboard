package org.beanpod.switchboard.dto;

import lombok.*;

import java.time.OffsetDateTime;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class LogDto {

    private Long id;

    private OffsetDateTime dateTime;

    private String message;

    private String level;

    private String serialNumber;
}
