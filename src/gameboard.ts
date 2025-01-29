class GameBoard implements IScreen {
  private backgroundImage!: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private selectedPlayers: number;
  private platforms: Platform[];
  private platformSpawnTimer: number;
  private platformSpawnInterval: number;
  private translateY: number;
  private backgroundMusic?: string;
  private time: Time;
  private startPlatform: Platform | null;
  private startPlatformSpawnTime: number;
  private startPlatformSpawned: boolean;
  private speedUpCounter: number;
  private gameStartTime: number;
  private playerImage1: p5.Image;
  private playerImage2: p5.Image;
  private playerImage3: p5.Image;
  private playerImage4: p5.Image;

  constructor(players: Player[], selectedPlayers: number) {
    this.playerImages = [];
    this.players = players;
    this.selectedPlayers = selectedPlayers;
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 500;
    this.translateY = 0;
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
    this.loadImages();
    this.speedUpCounter = 2;
    this.gameStartTime = millis();

    this.playerImage1 = loadImage("/assets/images/cats/Player1Head.png");
    this.playerImage2 = loadImage("/assets/images/cats/Player2Head.png");
    this.playerImage3 = loadImage("/assets/images/cats/Player3Head.png");
    this.playerImage4 = loadImage("/assets/images/cats/Player4Head.png");
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeapBackground.jpg",
    );
    this.playerImages[100] = loadImage("/assets/images/platforms/Platform.png");
    this.playerImages[101] = loadImage(
      "/assets/images/platforms/starting-platform.png",
    );
    this.playerImages[102] = loadImage(
      "/assets/images/platforms/startPlatformGif.gif",
    );
  }

  private detectHit() {
    for (const player of this.players) {
      if (this.startPlatform) {
        const startPlatformTop = 600 - this.translateY;

        if (player.velocity > 0 && player.posY > startPlatformTop) {
          player.automaticBounce(startPlatformTop + this.translateY);
        }
      }

      for (const player of this.players) {
        for (const platform of this.platforms) {
          const playerLeft = player.posX;
          const playerRight = player.posX + player.width;
          const platformLeft = platform.posX;
          const platformRight = platform.posX + platform.width;

          const playerTop = player.posY;
          const playerBottom = player.posY + player.height;
          const platformTop = platform.posY + this.translateY;
          const platformBottom =
            platform.posY + platform.height + this.translateY;

          if (
            player.velocity > 2 &&
            playerLeft < platformRight &&
            playerRight > platformLeft &&
            playerBottom >= platformTop &&
            playerBottom < platformBottom &&
            playerTop < platformTop
          ) {
            player.automaticBounce(platformTop);

            // if (gameObject instanceof Platform) {
            // Avgör om man föll ner på plattformen först
            // 1. flytta spelaren till ovanpå platformen
            // 2. trigga stuts
            // 3. spela ljud
            //4.
            // }
          }
        }
      }
    }
  }

  private speedUpGame() {
    const gameTime = millis() - this.gameStartTime;
    if (gameTime >= 40 * 1000) {
      this.speedUpCounter = 5;
    } else if (gameTime >= 30 * 1000) {
      this.speedUpCounter = 3.5;
    } else if (gameTime >= 20 * 1000) {
      this.speedUpCounter = 2.5;
    }
  }

  private drawBackground() {
    image(this.backgroundImage, 0, 0, 1400, 700);
  }

  private spawnPlatform() {
    if (millis() - this.platformSpawnTimer > this.platformSpawnInterval) {
      const newPlatform = new Platform(
        30,
        100,
        random(100, 1300),
        50 - this.translateY,
        this.playerImages,
        100,
      );
      this.platforms.push(newPlatform);

      // Reset timer
      this.platformSpawnTimer = millis();
    }
  }

  private spawnStartPlatform() {
    this.startPlatform = new Platform(
      70,
      1200,
      100,
      600,
      this.playerImages,
      101,
    );
    this.startPlatformSpawnTime = millis();
  }

  private checkForWinner() {
    const alivePlayers = this.players.filter((player) => player.isAlive);

    if (this.players.length === 1) {
      // Singleplayer-logik
      if (alivePlayers.length === 0) {
        game.changeScreen(new GameEnd(null));
      }
    } else {
      // Multiplayer-logik
      if (alivePlayers.length === 1) {
        const lastPlayerStanding = alivePlayers[0];
        lastPlayerStanding.onDeath = () => {
          const winnerIndex = this.players.indexOf(lastPlayerStanding);
          game.changeScreen(new GameEnd(winnerIndex));
        };
      }
    }
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

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 4000) {
      this.startPlatform.imageIndex = 102;
    }

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 7000) {
      this.startPlatform = null;
    }

    this.players.forEach((player) => {
      player.update();
      // when player falls off the screen they die, player.die in player class = true
      if (player.posY > height) {
        player.die();
      }
    });

    this.translateY += this.speedUpCounter;

    this.detectHit();

    this.removeOffScreenPlatforms();

    this.speedUpGame();

    this.checkForWinner();

  }

  private removeOffScreenPlatforms() {
    // Filter platforms, keeping only those within the visible screen in game
    this.platforms = this.platforms.filter(
      (platform) => platform.posY < 700 + this.translateY,
    );
  }

  private drawTimerBorder() {
    // Draw the border
    noFill();
    rectMode(CORNER);
    stroke(255);
    strokeWeight(5);
    rect(2, 1, 1396, 55);

    // Only draw images for active players
    let imgWidth = 45;
    let imgHeight = 35;
    let padding = 10;

    // Calculate position inside the border
    let startX = 1396 - (imgWidth * this.selectedPlayers + padding * (this.selectedPlayers - 1)) - 30;
    let startY = 1 + (55 - imgHeight) / 2; 

    // Draw only the images for selected players
    if (this.selectedPlayers >= 1) image(this.playerImage1, startX, startY, imgWidth, imgHeight);
    if (this.selectedPlayers >= 2) image(this.playerImage2, startX + imgWidth + padding, startY, imgWidth, imgHeight);
    if (this.selectedPlayers >= 3) image(this.playerImage3, startX + (imgWidth + padding) * 2, startY, imgWidth, imgHeight);
    if (this.selectedPlayers >= 4) image(this.playerImage4, startX + (imgWidth + padding) * 3, startY, imgWidth, imgHeight);
}


  public draw() {
    push();
    this.drawBackground();
    this.players.forEach((player) => player.draw());
    this.time.drawCountdown();
    this.time.drawTimer();
    if (this.startPlatform) {
      this.startPlatform.spawnPlatform();
    }

    this.drawTimerBorder();

    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.draw());
    pop();
  }
}
