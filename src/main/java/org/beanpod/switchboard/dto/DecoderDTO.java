package org.beanpod.switchboard.dto;

import org.beanpod.switchboard.entity.DeviceEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DecoderDTO {
    private String serialNumber;
    private DeviceEntity device;
}
