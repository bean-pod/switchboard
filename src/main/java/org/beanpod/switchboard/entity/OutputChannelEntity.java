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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "channel_id")
    private ChannelEntity channel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "encoder_serial")
    @JsonIgnoreProperties("output")
    private EncoderEntity encoder;
}
