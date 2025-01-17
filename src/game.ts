class Game {
  private GameEnd: GameEnd;

  constructor() {
    this.GameEnd = new GameEnd();
  }

  public update() {
    this.GameEnd.update();
  }

  public draw() {
    background("#F0DEB5");
    this.GameEnd.draw();
  }

  public changeScreen(screen: any) {}
}
