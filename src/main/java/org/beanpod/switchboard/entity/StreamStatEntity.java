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

  private long time;

  private long windowFlow;

  private long congestion;
  private long flight;

  private long rtt;
  private long bandwidth;
  private long maxBandwidth;

  private long sendPackets;
  private long sendPacketsLost;
  private long sendPacketsDropped;
  private long sendPacketsRetransmitted;
  private long sendBytes;
  private long sendBytesDropped;
  private long sendMbitRate;

  private long recvPackets;
  private long recvPacketsLost;
  private long recvPacketsDropped;
  private long recvPacketsRetransmitted;
  private long recvPacketsBelated;
  private long recvBytes;
  private long recvBytesLost;
  private long recvBytesDropped;
  private long recvMbitRate;
}
