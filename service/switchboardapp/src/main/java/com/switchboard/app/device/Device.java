package com.switchboard.app.device;

import com.switchboard.app.encoder.Encoder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Device {

    @Id
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "display_name")
    private String DisplayName;

    private String Status;

    @OneToOne(mappedBy = "device")
    private Encoder encoder;
}
