package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceDTO {
    private String serialNumber;
    private String ipAddress;
    private String displayName;
    private String status;
}
