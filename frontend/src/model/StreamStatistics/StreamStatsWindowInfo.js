export default class StreamStatsWindowInfo {
  constructor(flow, congestion, flight) {
    this.flow = flow;
    this.congestion = congestion;
    this.flight = flight;
  }
}
