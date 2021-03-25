export default class StreamStatsLink {
  constructor(rtt, bandwidth, maxBandwidth) {
    this.rtt = rtt;
    this.bandwidth = bandwidth;
    this.maxBandwidth = maxBandwidth;
  }
}
