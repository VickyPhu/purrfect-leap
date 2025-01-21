class Game {
  // private GameEnd: GameEnd;
  private playerSelect: PlayerSelect;

  constructor() {
    // this.GameEnd = new GameEnd();
    this.playerSelect = new PlayerSelect();
  }

  public update() {
    // this.GameEnd.update();
    this.playerSelect.update();
  }

  public draw() {
    background("#F0DEB5");
    // this.GameEnd.draw();
    this.playerSelect.draw();
  }

  public changeScreen(screen: any) {}
}
