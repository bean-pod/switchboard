export default class LogInfo {
    constructor(dateTime, level, encoderSerial, decoderSerial, message) {
      this.dateTime = new Date(dateTime)
        .toString()
        .split(" ")
        .slice(0, 5)
        .join(" ");
      this.level = level;
      this.encoderSerial = encoderSerial,
      this.decoderSerial = decoderSerial,
      this.message = message;
    }
  }
  