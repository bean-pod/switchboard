export default class LogInfo {
  constructor(id, dateTime, level, message) {
    this.id = id;
    this.dateTime = new Date(dateTime).toISOString();
    this.level = level;
    this.message = message;
  }
}
