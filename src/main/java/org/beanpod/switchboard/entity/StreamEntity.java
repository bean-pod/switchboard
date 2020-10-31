package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Base64;

@Entity(name = "Stream")
@Data
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
@AllArgsConstructor
@Builder
public class StreamEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "encoder_id", referencedColumnName = "serial_number")
    private EncoderEntity encoder;

    @ManyToOne
    @JoinColumn(name = "decoder_id", referencedColumnName = "serial_number")
    private DecoderEntity decoder;
}
