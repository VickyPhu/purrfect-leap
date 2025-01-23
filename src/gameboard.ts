class GameBoard implements IScreen {
  private backgroundImage: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private platforms: Platform[];
  private platformSpawnTimer: number;
  private platformSpawnInterval: number;
  private translateY: number;
  private backgroundMusic: string;
  private startTime: number;
  private elapsedTime: number;
  private countdownTime: number;
  private countdownEnd: boolean;
  private countdownValue: number;

  constructor() {
    this.playerImages = [];
    this.players = [];
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 2000;
    this.translateY = 0;
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
    this.playerImages[0] = loadImage("/assets/images/cats/Player11.png");
    this.playerImages[1] = loadImage("/assets/images/cats/Player12.png");
    this.playerImages[2] = loadImage("/assets/images/cats/Player13.png");
    this.playerImages[3] = loadImage("/assets/images/cats/Player14.png");
    this.playerImages[4] = loadImage("/assets/images/cats/Player11M.png");
    this.playerImages[5] = loadImage("/assets/images/cats/Player12M.png");
    this.playerImages[6] = loadImage("/assets/images/cats/Player13M.png");
    this.playerImages[7] = loadImage("/assets/images/cats/Player14M.png");
    this.playerImages[8] = loadImage("/assets/images/platforms/Platform.png");
    this.spawnPlayer();
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

  private spawnPlatform() {
    if (millis() - this.platformSpawnTimer > this.platformSpawnInterval) {
      const newPlatform = new Platform(
        50,
        200,
        random(50, 1350),
        50 - this.translateY,
        this.playerImages,
        8,
      );
      this.platforms.push(newPlatform);

      // Reset timer
      this.platformSpawnTimer = millis();
    }
  }

  private spawnPlayer() {
    this.players.push(new Player(150, 200, 200, 300, this.playerImages, 0));
  }

  public update() {
    if (!this.countdownEnd) {
      this.updateCountdown();
    } else {
      this.updateTime();
      this.spawnPlatform();
    }

    this.players.forEach((player) => player.update());
  }

  public draw() {
    this.drawBackground();
    this.players.forEach((player) => player.renderPlayer());
    translate(0, 5);
    push();
    this.translateY += 2;
    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.renderPlatform());
    pop();

    push();
    fill("#000");
    textAlign(CENTER, CENTER);
    textFont("Fredoka", 300);

    if (!this.countdownEnd) {
      text(this.countdownValue, width * 0.5, height * 0.5);
      pop();
    } else {
      push();
      textAlign(LEFT, CENTER);
      textSize(50);
      text(`Time: ${nf(this.elapsedTime, 1, 1)}sec`, 0, 30);
      pop();
    }
  }
}
