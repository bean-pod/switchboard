export default class StreamStatsReceiveInfo {
  constructor(receiving) {
    this.packets = receiving.packets;
    this.packetsLost = receiving.packetsLost;
    this.packetsDropped = receiving.packetsDropped;
    this.packetsRetransmitted = receiving.packetsRetransmitted;
    this.packetsBelated = receiving.packetsBelated;
    this.bytes = receiving.bytes;
    this.bytesLost = receiving.bytesLost;
    this.bytesDropped = receiving.bytesDropped;
    this.mbitRate = receiving.mbitRate;
  }
}
