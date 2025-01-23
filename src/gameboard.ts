class GameBoard implements IScreen {
  private backgroundImage: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private platforms: Platform[];
  private platformSpawnTimer: number;
  private platformSpawnInterval: number;
  private translateY: number;
  private backgroundMusic: string;
  private time: Time;
  private startPlatform: Platform | null;
  private startPlatformSpawnTime: number;
  private startPlatformSpawned: boolean;

  constructor() {
    this.playerImages = [];
    this.players = [];
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 2000;
    this.translateY = 0;
    this.loadImages();
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeapBackground.jpg",
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
    this.playerImages[9] = loadImage(
      "/assets/images/platforms/starting-platform.png",
    );
    this.spawnPlayer();
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

  private spawnStartPlatform() {
    this.startPlatform = new Platform(100, 900, 250, 600, this.playerImages, 9);
    this.startPlatformSpawnTime = millis();
  }

  private spawnPlayer() {
    this.players.push(new Player(150, 200, 200, 300, this.playerImages, 0));
  }

  public update() {
    // Updates the countdown and when countdown is over runs the else condition (starts timer)
    if (!this.time.countdownEnd) {
      this.time.updateCountdown();
    } else {
      this.time.updateTimer();
      this.spawnPlatform();
    }
    if (!this.startPlatformSpawned) {
      this.spawnStartPlatform();
      this.startPlatformSpawned = true;
    }

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 5000) {
      this.startPlatform = null;
    }

    this.players.forEach((player) => player.update());

    this.removeOffScreenPlatforms();
  }

  private removeOffScreenPlatforms() {
    // Filter platforms, keeping only those within the visible screen in game
    this.platforms = this.platforms.filter((platform) => platform.posY < 700 + this.translateY);
  }

  public draw() {
    this.drawBackground();
    this.players.forEach((player) => player.renderPlayer());
    this.time.drawCountdown();
    this.time.drawTimer();
    if (this.startPlatform) {
      this.startPlatform.spawnPlatform();
    }
    translate(0, 5);
    push();
    this.translateY += 2;
    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.renderPlatform());
    pop();
  }
}
