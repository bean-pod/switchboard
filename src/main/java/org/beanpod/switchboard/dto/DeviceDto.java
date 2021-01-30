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
public class DeviceDto {
  @NotNull private String serialNumber;
  @NotNull private String publicIpAddress;
  @NotNull private String privateIpAddress;
  @NotNull private String displayName;
  private String status;
}
