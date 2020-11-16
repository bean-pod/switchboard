package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "OutputChannel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class OutputChannelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @OneToOne(optional = false, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "channel_id")
    private ChannelEntity channel;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "encoder_serial")
    private EncoderEntity encoder;
}
