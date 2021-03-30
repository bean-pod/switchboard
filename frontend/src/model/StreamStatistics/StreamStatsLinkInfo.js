export default class StreamStatsLinkInfo {
  constructor(link) {
    this.rtt = link.rtt;
    this.bandwidth = link.bandwidth;
    this.maxBandwidth = link.maxBandwidth;
  }
}
