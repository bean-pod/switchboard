package org.beanpod.switchboard.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamStatDto {

  @NotNull private long id;
  private Long time;
  private Long flow;
  private Long congestion;
  private Long flight;

  private Double rtt;
  private Double bandwidth;
  private Long maxBandwidth;

  private Long sendPackets;
  private Long sendPacketsLost;
  private Long sendPacketsDropped;
  private Long sendPacketsRetransmitted;
  private Long sendBytes;
  private Long sendBytesDropped;
  private Double sendMbitRate;

  private Long recvPackets;
  private Long recvPacketsLost;
  private Long recvPacketsDropped;
  private Long recvPacketsRetransmitted;
  private Long recvPacketsBelated;
  private Long recvBytes;
  private Long recvBytesLost;
  private Long recvBytesDropped;
  private Double recvMbitRate;
}
