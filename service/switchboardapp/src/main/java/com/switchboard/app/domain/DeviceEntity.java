package com.switchboard.app.domain;

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

    @Column(name = "display_name")
    @NotNull
    private String DisplayName;

    private String Status;

    @OneToOne(mappedBy = "device")
    private EncoderEntity encoderEntity;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DecoderEntity decoderEntity;
}
