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
