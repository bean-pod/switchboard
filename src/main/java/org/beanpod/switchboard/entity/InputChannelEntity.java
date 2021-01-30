package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "InputChannel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class InputChannelEntity {
  @Id
  @NotNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(cascade = {CascadeType.MERGE})
  @JoinColumn(name = "channel_id")
  private ChannelEntity channel;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "decoder_serial")
  @JsonIgnoreProperties("input")
  private DecoderEntity decoder;
}
