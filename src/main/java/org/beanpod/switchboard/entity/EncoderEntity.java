package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity(name = "Encoder")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class EncoderEntity {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name="last_communication")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date lastCommunication;


    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "serial_number", referencedColumnName = "serial_number")
    @MapsId
    private DeviceEntity device;

    @OneToMany(fetch = FetchType.LAZY,
            mappedBy="encoderEntity",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    private Set<ChannelEntity> outputs;
}
