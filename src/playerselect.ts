class PlayerSelect implements IScreen {
  private playerSelectButton: Button;
  private startButton: Button;

  constructor() {
    this.playerSelectButton = new Button('1 PLAYER', '#F96B6B', 350, 100, 500, 250);
    this.playerSelectButton = new Button('2 PLAYER', '#C2E1B5', 350, 100, 500, 250);
    this.playerSelectButton = new Button('3 PLAYER', '#F0AB63', 350, 100, 500, 250);
    this.playerSelectButton = new Button('4 PLAYER', '#CBA3D2', 350, 100, 500, 250);
    this.startButton = new Button('START GAME', '#F96B6B', 350, 100, 500, 380);
  }

  private drawImage() {

  }
  private drawPlayerSelectButton() {
    this.playerSelectButton.draw();
  }
  private drawStartButton() {
    this.startButton.draw();
  }

  public update() {}

    public draw() {
       fill('#F0DEB5')
        noStroke();
        rect(390, 190, 580, 350, 50);
        this.drawTitle();
        this.drawButtons();
    }
}