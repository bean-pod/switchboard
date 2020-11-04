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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;
    
    @Column(name = "port")
    private Integer port;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "decoder_serial")
    private DecoderEntity decoder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "encoder_serial")
    private EncoderEntity encoder;
}