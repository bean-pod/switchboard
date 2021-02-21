export default class LogInfo {
  constructor(id, dateTime, level, message) {
    this.id = id;
    this.dateTime = new Date(dateTime)
      .toString()
      .split(" ")
      .slice(0, 5)
      .join(" ");
    this.level = level;
    this.message = message;
  }
}
