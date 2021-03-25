export default class StreamStatsDeviceInfo {
  constructor(
    deviceType,
    packets,
    packetsLost,
    packetsDropped,
    packetsRetransmitted,
    packetsBelated,
    bytes,
    bytesDropped,
    mbitRate
  ) {
    if (deviceType === "receive") {
      this.deviceType = deviceType;
      this.packets = packets;
      this.packetsLost = packetsLost;
      this.packetsDropped = packetsDropped;
      this.packetsRetransmitted = packetsRetransmitted;
      this.packetsBelated = packetsBelated;
      this.bytes = bytes;
      this.bytesDropped = bytesDropped;
      this.mbitRate = mbitRate;
    } else {
      this.deviceType = deviceType;
      this.packets = packets;
      this.packetsLost = packetsLost;
      this.packetsDropped = packetsDropped;
      this.packetsRetransmitted = packetsRetransmitted;
      this.bytes = bytes;
      this.bytesDropped = bytesDropped;
      this.mbitRate = mbitRate;
    }
  }
}
