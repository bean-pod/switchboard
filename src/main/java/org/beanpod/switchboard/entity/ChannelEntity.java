package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Channel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler", "out", "in"})
public class ChannelEntity {
    @Id
    String name;
    Integer port;

    @ManyToOne(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE})
    @JoinColumn(name = "decoder_serial")
    DecoderEntity decoderEntity;

    @ManyToOne(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE})
    @JoinColumn(name = "encoder_serial")
    EncoderEntity encoderEntity;
}