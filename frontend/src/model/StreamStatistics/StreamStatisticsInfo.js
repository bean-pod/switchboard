export default class StreamStatisticsInfo {
  constructor(id, time, window, link, send, receive) {
    this.id = id;
    this.time = time;
    this.window = window;
    this.link = link;
    this.send = send;
    this.receive = receive;
  }
}
