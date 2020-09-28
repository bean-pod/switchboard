package com.switchboard.app.decoder;

import com.switchboard.app.device.Device;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter@Getter
public class decoder {

    @Id
    @Column(name = "serial_number")
    private String serialNumber;

    @OneToOne
    @JoinColumn(name="serial_number")
    @MapsId
    private Device device;
}
