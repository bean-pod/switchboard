package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Device")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler", "encoderEntity", "decoderEntity"})
public class DeviceEntity {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "ip_address", unique = true)
    @NotNull
    private String ipAddress;

    @Column(name = "display_name")
    @NotNull
    private String displayName;

    private String status;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL)
    private EncoderEntity encoderEntity;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL)
    private DecoderEntity decoderEntity;
}
