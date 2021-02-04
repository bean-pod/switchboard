package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity(name = "Decoder")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyIntializer", "handler"})
public class DecoderEntity implements DummyInterface{

  @Id
  @NotNull
  @Column(name = "serial_number")
  private String serialNumber;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date lastCommunication;

  @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinColumn(name = "serial_number", referencedColumnName = "serial_number")
  @MapsId
  private DeviceEntity device;

  @OneToMany(
      fetch = FetchType.LAZY,
      cascade = {CascadeType.ALL})
  @JoinColumn(name = "decoder_serial")
  @JsonIgnoreProperties("decoder")
  private Set<InputChannelEntity> input;
}
