export class ConsoleLogger {
  constructor() {
    this.history = [];
  }

  log(message) {
    this.history.push(message);
    console.log(message);
  }
}
