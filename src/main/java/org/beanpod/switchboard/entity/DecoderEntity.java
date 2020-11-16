package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity(name = "Decoder")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyIntializer", "handler"})
public class DecoderEntity {

    @Id
    @NotNull
    @Column(name = "serial_number")
    private String serialNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastCommunication;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "serial_number", referencedColumnName = "serial_number")
    @MapsId
    private DeviceEntity device;

    @OneToMany(mappedBy= "decoder", fetch= FetchType.LAZY)
    @JsonManagedReference
    private Set<InputChannelEntity> input;
}
