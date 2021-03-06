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
