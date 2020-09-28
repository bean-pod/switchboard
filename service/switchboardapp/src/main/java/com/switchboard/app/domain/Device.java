package com.switchboard.app.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
public class Device {

    @Id
    @Column(name = "serial_number")
    private Long serialNumber;

    @Column(name = "display_name")
    private String DisplayName;

    private String Status;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL)
    private Encoder encoder;
}
