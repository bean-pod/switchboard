package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Base64;

@Entity(name = "Stream")
@Data
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class StreamEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @NonNull
    @JoinColumn(name = "encoder_id", referencedColumnName = "serial_number")
    private EncoderEntity encoder;

    @ManyToOne
    @NonNull
    @JoinColumn(name = "decoder_id", referencedColumnName = "serial_number")
    private DecoderEntity decoder;
}
