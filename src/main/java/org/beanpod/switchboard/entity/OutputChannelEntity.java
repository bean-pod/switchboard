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
    private long id;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "channel_id")
    private ChannelEntity channel;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST
    })
    @JoinColumn(name = "encoder_serial")
    private EncoderEntity encoder;
}
