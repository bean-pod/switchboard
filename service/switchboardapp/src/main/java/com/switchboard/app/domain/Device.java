package com.switchboard.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer","handler","encoder","decoder"})
public class Device {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "display_name")
    @NotNull
    private String DisplayName;

    private String Status;

    @OneToOne(mappedBy = "device")
    private Encoder encoder;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Decoder decoder;
}
