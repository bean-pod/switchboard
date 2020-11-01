package com.switchboard.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO {
    private String serialNumber;
    private String ipAddress;
    private String displayName;
    private String status;
}
