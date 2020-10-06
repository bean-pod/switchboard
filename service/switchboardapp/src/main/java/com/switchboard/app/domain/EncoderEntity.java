package com.switchboard.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Encoder")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class EncoderEntity {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serial_number", referencedColumnName = "serial_number")
    @MapsId
    private DeviceEntity device;
}
