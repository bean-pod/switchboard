package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Encoder")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyIntializer", "handler"})
public class EncoderEntity implements DecoderEncoderInterface {

  @Id
  @NotNull
  @Column(name = "serial_number")
  private String serialNumber;

  @Column(name = "last_communication")
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
  @JoinColumn(name = "encoder_serial")
  @JsonIgnoreProperties("encoder")
  private Set<OutputChannelEntity> output;

  @Lob private byte[] configurationSchema;
  @Lob private byte[] configurationInstance;

  @Column(name = "configuration_last_modified")
  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date configurationLastModified;
}
