export default class StreamStatsSendInfo {
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
