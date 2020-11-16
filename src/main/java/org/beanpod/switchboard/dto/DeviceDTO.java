package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceDTO {
    @NotNull
    private String serialNumber;
    @NotNull
    private String ipAddress;
    @NotNull
    private String displayName;
    private String status;
}
