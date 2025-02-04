export class ThrowResult {
  public message: string;
  public route?: string;

  constructor(message: string, route?: string) {
    this.message = message;
    this.route = route;
  }

  public static continueGame(): ThrowResult {
    return new ThrowResult("Game is still in progress");
  }

  public static gameFinished(): ThrowResult {
    return new ThrowResult("Game finished", "WinnerDetails");
  }

  public static roundFinished(): ThrowResult {
    return new ThrowResult("Round finished", "PlayerRoundReview");
  }
}
