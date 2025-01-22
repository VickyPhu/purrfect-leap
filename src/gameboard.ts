class GameBoard implements IScreen {
  private backgroundImage: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private platforms: Platform[];
  private backgroundMusic: string;
  private startTime: number;
  private elapsedTime: number;
  private countdownTime: number;
  private countdownEnd: boolean;
  private countdownValue: number;

  constructor(playerImages: p5.Image[]) {
    this.playerImages = playerImages;
    this.players = [];
    this.platforms = [];
    this.loadImages();
    this.elapsedTime = 0;
    this.countdownTime = millis();
    this.countdownValue = 3;
    this.countdownEnd = false;
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeap Background.jpg",
    );
  }

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

  private detectHit() {}
  
  private drawBackground() {
    image(this.backgroundImage, 0, 0, 1400, 700);
  }
  
  private spawnPlatform() {}

  private spawnPlayer() {
    this.players.push(new Player(150, 200, 200, 300, this.playerImages, 0));
  }
  public setup() {
    this.spawnPlayer();
  }


  public update() {
    if (!this.countdownEnd) {
      this.updateCountdown();
    } else {
      this.updateTime();
    }

    this.players.forEach((player) => player.update());
  }

  public draw() {
    push();
    fill("#000");
    textAlign(CENTER, CENTER);
    textFont("Fredoka", 300);

    if (!this.countdownEnd) {
      text(this.countdownValue, width * 0.5, height * 0.5);
      pop();
    } else {
      push();
      textAlign(RIGHT, CENTER);
      textSize(50);
      text(`Time: ${nf(this.elapsedTime, 1, 1)}sec`, width - 10, 30);
      pop();

      this.drawBackground();
      this.players.forEach((player) => player.renderPlayer());
    }
  }
}
