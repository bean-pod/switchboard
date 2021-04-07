package org.beanpod.switchboard.dto;

import java.time.OffsetDateTime;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
  private UserDto user;
  @Lob private byte[] configurationInstance;
  private OffsetDateTime configurationLastModified;
}
