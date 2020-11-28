package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToOne(
      optional = false,
      cascade = {CascadeType.MERGE})
  @JoinColumn(name = "channel_id")
  private ChannelEntity channel;

  @ManyToOne(
      optional = false,
      fetch = FetchType.LAZY,
      cascade = {CascadeType.MERGE})
  @JoinColumn(name = "decoder_serial")
  @JsonBackReference
  private DecoderEntity decoder;
}
