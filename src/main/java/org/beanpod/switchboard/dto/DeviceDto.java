package org.beanpod.switchboard.dto;

import java.time.OffsetDateTime;
import javax.persistence.Column;
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
  @Lob private byte[] configurationInstance;

  @Column(name = "configuration_last_modified")
  private OffsetDateTime configurationLastModified;
}
