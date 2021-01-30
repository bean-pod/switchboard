package org.beanpod.switchboard.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Stream")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class StreamEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private long id;

  @OneToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "input_channel_id")
  private InputChannelEntity inputChannel;

  @OneToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "output_channel_id")
  private OutputChannelEntity outputChannel;

  @Column(name = "isRendezvous")
  @NotNull
  private Boolean isRendezvous;
}
