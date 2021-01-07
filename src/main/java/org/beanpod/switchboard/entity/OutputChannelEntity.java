package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@Entity(name = "OutputChannel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler"})
public class OutputChannelEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @OneToOne(cascade = {CascadeType.MERGE})
  @JoinColumn(name = "channel_id")
  private ChannelEntity channel;

  @ManyToOne(
      fetch = FetchType.LAZY,
      cascade = {CascadeType.MERGE})
  @JoinColumn(name = "encoder_serial")
  @JsonIgnoreProperties("output")
  private EncoderEntity encoder;
}
