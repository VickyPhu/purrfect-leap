class GameBoard implements IScreen {
  private backgroundImage: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private platforms: Platform[];
  private backgroundMusic: string;
  private time: Time;

  constructor(playerImages: p5.Image[]) {
    this.playerImages = playerImages;
    this.players = [];
    this.platforms = [];
    this.loadImages();
    this.time = new Time();
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeap Background.jpg",
    );
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
    // Updates the countdown and when countdown is over runs the else condition (starts timer)
    if (!this.time.countdownEnd) {
      this.time.updateCountdown();
    } else {
      this.time.updateTimer();
    }

    this.players.forEach((player) => player.update());
  }

  public draw() {
    this.drawBackground();
    this.players.forEach((player) => player.renderPlayer());
    this.time.drawCountdown();
    this.time.drawTimer();
  }
}
