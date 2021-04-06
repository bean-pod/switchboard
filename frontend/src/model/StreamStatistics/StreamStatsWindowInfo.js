export default class StreamStatsWindowInfo {
  constructor(window) {
    this.flow = window.flow;
    this.congestion = window.congestion;
    this.flight = window.flight;
  }
}
