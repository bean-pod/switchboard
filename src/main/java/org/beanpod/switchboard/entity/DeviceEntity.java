package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Device")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler", "encoderEntity", "decoderEntity"})
public class DeviceEntity {

  @Id
  @NotNull
  @Column(name = "serial_number")
  private String serialNumber;

  @Column(name = "private_ip_address")
  @NotNull
  private String privateIpAddress;

  @Column(name = "public_ip_address")
  @NotNull
  private String publicIpAddress;

  @Column(name = "display_name")
  @NotNull
  private String displayName;

  private String status;

  @OneToOne(
      mappedBy = "device",
      cascade = {CascadeType.REMOVE})
  private DecoderEntity decoderEntity;

  @OneToOne(
      mappedBy = "device",
      cascade = {CascadeType.REMOVE})
  private EncoderEntity encoderEntity;
}
