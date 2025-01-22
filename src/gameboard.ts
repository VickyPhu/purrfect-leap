class GameBoard implements IScreen {
  public backgroundImage: string;
  private backgroundMusic: string;
  private gameEntity: GameEntity[];
  private startTime: number;
  private elapsedTime: number;

  constructor() {
    this.startTime = millis();
    this.elapsedTime = 0; 
  }

  private spawnPlatform() {}

  private translateWorld() {}

  private spawnPlayer() {}

  private updateTime() {
    this.elapsedTime = (millis)() - this.startTime / 1000;
  }

  private detectHit() {}

  public update() {
    this.updateTime();
  }

  public draw() {
    push();
    fill('#000');
    textAlign(RIGHT, CENTER);
    textFont('Fredoka', 30);
    text(`Time: ${nf(this.elapsedTime, 1, 1)}sec`, width - 10, 30);
    pop();
  }
}
