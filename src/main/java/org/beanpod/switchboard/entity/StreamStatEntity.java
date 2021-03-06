package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "StreamStats")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"hibernateLazyIntializer", "handler"})
public class StreamStatEntity {

  @Id
  @NotNull
  @Column(name = "id")
  private long id;

  @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinColumn(name = "id", referencedColumnName = "id")
  @MapsId
  private StreamEntity stream;

  private double time;

  private double windowFlow;

  private double congestion;
  private double flight;

  private double rtt;
  private double bandwidth;
  private double maxBandwidth;

  private double sendPackets;
  private double sendPacketsLost;
  private double sendPacketsDropped;
  private double sendPacketsRetransmitted;
  private double sendBytes;
  private double sendBytesDropped;
  private double sendMbitRate;

  private double recvPackets;
  private double recvPacketsLost;
  private double recvPacketsDropped;
  private double recvPacketsRetransmitted;
  private double recvPacketsBelated;
  private double recvBytes;
  private double recvBytesLost;
  private double recvBytesDropped;
  private double recvMbitRate;
}
