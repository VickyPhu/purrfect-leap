class Time {
  private startTimer: number;
  private elapsedTime: number;
  private countdownTime: number;
  private countdownValue: number;
  public countdownEnd: boolean;

  constructor() {
    this.startTimer = 0;
    this.elapsedTime = 0;
    this.countdownTime = millis();
    this.countdownValue = 3;
    this.countdownEnd = false;
  }

  public updateCountdown() {
    // count passed time since countdown and update the countdown value
    const timePassed = Math.floor((millis() - this.countdownTime) / 1000);
    this.countdownValue = 3 - timePassed;

    // when countdown is finished start timer for the game
    if (this.countdownValue === 0) {
      this.countdownEnd = true;
      this.startTimer = millis();
    }
  }

  public updateTimer() {
    // update the games time only when countdown is over
    if (this.countdownEnd) {
      this.elapsedTime = (millis() - this.startTimer) / 1000;
    }
  }

  public drawCountdown() {
    push();
    fill("#000");
    textAlign(CENTER, CENTER);
    textFont("Fredoka", 300);
    if (!this.countdownEnd) {
      text(this.countdownValue, width * 0.5, height * 0.5);
      pop();
    }
  }

  public drawTimer() {
    push();
    fill("#000");
    textAlign(LEFT, CENTER);
    textFont("Fredoka", 50);
    text(`Time: ${nf(this.elapsedTime, 1, 1)}sec`, 5, 30);
    pop();
  }
}
