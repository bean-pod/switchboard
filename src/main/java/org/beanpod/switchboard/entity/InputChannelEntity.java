package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="InputChannel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class InputChannelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "channel_id")
    private ChannelEntity channel;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.ALL
    })
    @JoinColumn(name = "decoder_serial")
    private DecoderEntity decoder;
}
