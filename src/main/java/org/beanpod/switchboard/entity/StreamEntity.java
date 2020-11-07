package org.beanpod.switchboard.entity;

import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity(name = "Stream")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class StreamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "input_channel_id")
    private InputChannelEntity inputChannel;

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "output_channel_id")
    private OutputChannelEntity outputChannel;
}
