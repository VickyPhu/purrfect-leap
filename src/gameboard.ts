class GameBoard implements IScreen {
  public backgroundImage: string;
  private backgroundMusic: string;
  private gameEntity: GameEntity[];
  private startTime: number;
  private elapsedTime: number;
  private countdownTime: number;
  private countdownEnd: boolean;
  private countdownValue: number;

  constructor() {
    this.elapsedTime = 0; 
    this.countdownTime = millis();
    this.countdownValue = 3;
    this.countdownEnd = false;
  }

  private spawnPlatform() {}

  private translateWorld() {}

  private spawnPlayer() {}

  private detectHit() {}

  private updateCountdown() {
    // count passed time since countdown and update the countdown value
    const timePassed = Math.floor((millis() - this.countdownTime) / 1000);
    this.countdownValue = 3 - timePassed;

    // when countdown is finished start timer for the game
    if (this.countdownValue <= 0) {
      this.countdownEnd = true;
      this.startTime = millis();
    }
  }

  private updateTime() {
    // update the games time
    if (this.countdownEnd) {
      this.elapsedTime = (millis() - this.startTime) / 1000;
    }
  }

  public update() {
    if (!this.countdownEnd) {
      this.updateCountdown();
    } else {
      this.updateTime();
    }
  }

  public draw() {
    push();
    fill('#000');
    textAlign(CENTER, CENTER);
    textFont('Fredoka', 300);

    if (!this.countdownEnd) {
      text(this.countdownValue, width * 0.5, height * 0.5);
    pop();
    } else {
      push();
      textAlign(RIGHT, CENTER);
      textSize(50);
      text(`Time: ${nf(this.elapsedTime, 1, 1)}sec`, width - 10, 30);
      pop();
    }
  }
}
