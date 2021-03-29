export class StreamStatsSendInfo {
  constructor(
    packets,
    packetsLost,
    packetsDropped,
    packetsRetransmitted,
    bytes,
    bytesDropped,
    mbitRate
  ) {
    this.packets = packets;
    this.packetsLost = packetsLost;
    this.packetsDropped = packetsDropped;
    this.packetsRetransmitted = packetsRetransmitted;
    this.bytes = bytes;
    this.bytesDropped = bytesDropped;
    this.mbitRate = mbitRate;
  }
}

export class StreamStatsReceiveInfo {
  constructor(
    packets,
    packetsLost,
    packetsDropped,
    packetsRetransmitted,
    packetsBelated,
    bytes,
    bytesLost,
    bytesDropped,
    mbitRate
  ) {
    this.packets = packets;
    this.packetsLost = packetsLost;
    this.packetsDropped = packetsDropped;
    this.packetsRetransmitted = packetsRetransmitted;
    this.packetsBelated = packetsBelated;
    this.bytes = bytes;
    this.bytesLost = bytesLost;
    this.bytesDropped = bytesDropped;
    this.mbitRate = mbitRate;
  }
  
}
