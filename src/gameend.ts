class GameEnd implements IScreen {
  private playAgainButton: Button;
  private startMenuButton: Button;

  constructor() {
    this.playAgainButton = new Button(
      "PLAY AGAIN",
      "#c2e1b5",
      100,
      50,
      500,
      280
    );
    this.startMenuButton = new Button(
      "MAIN MENU",
      "#f0ab63",
      100,
      50,
      900,
      280
    );
  }

  public update() {}

  private drawTitle() {}
  private drawImage() {}
  private drawButtons() {
    this.playAgainButton.draw();
    this.startMenuButton.draw();
  }

  public draw() {
    this.drawTitle();
    this.drawImage();
    this.drawButtons();
  }
}
