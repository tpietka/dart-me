export class GameNotStartedException extends Error {
  constructor(message: string = "The game has not started yet.") {
    super(message);
    this.name = "GameNotStartedException";
  }
}
