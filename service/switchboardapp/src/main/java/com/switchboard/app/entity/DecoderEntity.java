package com.switchboard.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity(name = "Decoder")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})

public class DecoderEntity {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    private Date lastCommunication;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "serial_number", referencedColumnName = "serial_number")
    @MapsId
    private DeviceEntity device;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name="decoder_channel",
            joinColumns = @JoinColumn(name="serial_number"),
            inverseJoinColumns = @JoinColumn(name="port")
    )
    private Set<ChannelEntity> inputs;
}
