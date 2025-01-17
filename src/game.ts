class Game {
  private playerSelect: PlayerSelect;

  constructor() {
    this.playerSelect = new PlayerSelect;
  }

  public update() {
    this.playerSelect.update();

  }

  public draw() {
    background("#F0DEB5");
    this.playerSelect.draw();
  }
  

  public changeScreen(screen: any) {
    
  }
}
