export interface IPlayer {
  getName(): string;
}

export class Player implements IPlayer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
