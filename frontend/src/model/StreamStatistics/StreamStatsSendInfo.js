export default class StreamStatsSendInfo {
  constructor(sending) {
    this.packets = sending.packets;
    this.packetsLost = sending.packetsLost;
    this.packetsDropped = sending.packetsDropped;
    this.packetsRetransmitted = sending.packetsRetransmitted;
    this.bytes = sending.bytes;
    this.bytesDropped = sending.bytesDropped;
    this.mbitRate = sending.mbitRate;
  }
}
