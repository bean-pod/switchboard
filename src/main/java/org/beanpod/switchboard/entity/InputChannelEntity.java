package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

  @OneToOne(cascade = {CascadeType.MERGE})
  @JoinColumn(name = "channel_id")
  private ChannelEntity channel;

  @ManyToOne(
      fetch = FetchType.LAZY)
  @JoinColumn(name = "decoder_serial")
  @JsonIgnoreProperties("input")
  private DecoderEntity decoder;
}
