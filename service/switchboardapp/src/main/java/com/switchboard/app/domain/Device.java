package com.switchboard.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer","handler","encoder","decoder"})
public class Device {

    @Id
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "display_name")
    private String DisplayName;

    private String Status;

    @OneToOne(mappedBy = "device")
    private Encoder encoder;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Decoder decoder;
}
