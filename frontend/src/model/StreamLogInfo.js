export default class StreamLogInfo {
  constructor(dateTime, level, encoderSerial, decoderSerial, message) {
    this.dateTime = dateTime;
    this.level = level;
    this.encoderSerial = encoderSerial;
    this.decoderSerial = decoderSerial;
    this.message = message;
  }
}
