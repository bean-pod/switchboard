package org.beanpod.switchboard.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
