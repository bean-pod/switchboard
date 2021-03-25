export default class StreamStatisticsInfo {
  constructor(streamId, time, window, link, send, receive) {
    this.streamId = streamId;
    this.time = time;
    this.window = window;
    this.link = link;
    this.send = send;
    this.receive = receive;
  }
}
