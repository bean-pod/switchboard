package com.switchboard.app.encoder;

import com.switchboard.app.device.Device;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Encoder {

    @Id
    private String serialNumber;

    @OneToOne
    private Device device;
}
