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
public class Encoder {

    @Id
    @Column(name = "serial_number")
    private Long serialNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="serial_number")
    @MapsId
    private Device device;
}
