class GameBoard implements IScreen {
  private backgroundImage!: p5.Image;
  private platformImages: p5.Image[];
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
  private powerUpImages: p5.Image[];
  private powerUpTimer: number;
  private powerUpInterval: number;
  private powerUps: (HighJumpPower | ExtraLifePower | ThrowYarnPower)[] = [];
  private speedUpCounter: number;
  private gameStartTime: number;
  private playerHeadImages: p5.Image[];

  constructor(players: Player[], selectedPlayers: number) {
    this.players = players;
    this.selectedPlayers = selectedPlayers;
    this.platforms = [];
    this.platformImages = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 500;
    this.translateY = 0;
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
    this.powerUpImages = [];
    this.playerHeadImages = [];
    this.loadImages();
    this.powerUpTimer = 0;
    this.powerUpInterval = 4000;
    this.speedUpCounter = 2;
    this.gameStartTime = millis();
    sound.menuMusic.stop();
    sound.gameMusic.play();
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/backgroundMoving.gif",
    );

    (this.platformImages[0] = loadImage(
      "/assets/images/platforms/startPlatform.png",
    )),
      (this.platformImages[1] = loadImage(
        "/assets/images/platforms/startPlatformFlashing.gif",
      )),
      (this.platformImages[2] = loadImage(
        "/assets/images/platforms/PlatformBroken.png",
      )),
      (this.platformImages[3] = loadImage(
        "/assets/images/platforms/Platform.png",
      ));

    this.powerUpImages[0] = loadImage(
      "/assets/images/powerups/catnip-power.png",
    );
    this.powerUpImages[1] = loadImage(
      "/assets/images/powerups/extralife-power.png",
    );
    this.powerUpImages[2] = loadImage("/assets/images/powerups/yarnpower.png");

    this.playerHeadImages[0] = loadImage("assets/images/cats/Player1Head.png");
    this.playerHeadImages[1] = loadImage("assets/images/cats/Player2Head.png");
    this.playerHeadImages[2] = loadImage("assets/images/cats/Player3Head.png");
    this.playerHeadImages[3] = loadImage("assets/images/cats/Player4Head.png");
  }

  private playerCollision() {
    // Loop through all players
    for (let i = 0; i < this.players.length; i++) {
      // Compare with remaining players
      for (let j = i + 1; j < this.players.length; j++) {
        const player1 = this.players[i];
        const player2 = this.players[j];

        // Calculate boundaries
        const player1Left = player1.posX;
        const player1Right = player1.posX + player1.width;
        const player1Top = player1.posY;
        const player1Bottom = player1.posY + player1.height;

        const player2Left = player2.posX;
        const player2Right = player2.posX + player2.width;
        const player2Top = player2.posY;
        const player2Bottom = player2.posY + player2.height;

        // First check if there's any collision at all
        if (
          player1Left < player2Right &&
          player1Right > player2Left &&
          player1Top < player2Bottom &&
          player1Bottom > player2Top
        ) {
          // Find if collision is more horizontal or vertical
          //Math.min returns the lowest number in the list
          const horizontalOverlap = Math.min(
            player1Right - player2Left,
            player2Right - player1Left,
          );
          const verticalOverlap = Math.min(
            player1Bottom - player2Top,
            player2Bottom - player1Top,
          );

          if (horizontalOverlap < verticalOverlap) {
            if (player1Left < player2Left) {
              player1.posX -= horizontalOverlap / 2;
              player2.posX += horizontalOverlap / 2;

              player1.horizontalVelocity = -10;
              player2.horizontalVelocity = 10;
            } else {
              player1.posX += horizontalOverlap / 2;
              player2.posX -= horizontalOverlap / 2;

              player1.horizontalVelocity = 10;
              player2.horizontalVelocity = -10;
            }
          } else {
            if (player1.velocity > 0 && player1Bottom > player2Top) {
              player1.velocity -= 15;
              player2.velocity += 5;
            }
            if (player2.velocity > 0 && player2Bottom > player1Top) {
              player2.velocity -= 15;
              player2.velocity += 5;
            }
          }
        }
      }
    }
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

            // If durability is 0, remove the broken platform from the platform array
            if (platform.durability <= 0) {
              const index = this.platforms.indexOf(platform);
              if (index > -1) {
                this.platforms.splice(index, 1);
              }
            }

            // if (gameObject instanceof Platform) {
            // Avgör om man föll ner på plattformen först
            // 1. flytta spelaren till ovanpå platformen
            // 2. trigga stuts
            // 3. spela ljud
            //4.
            // }
          }
        }
        for (const powerUp of this.powerUps) {
          const playerLeft = player.posX;
          const playerRight = player.posX + player.width;
          const playerTop = player.posY;
          const playerBottom = player.posY + player.height;

          const powerUpLeft = powerUp.posX;
          const powerUpRight = powerUp.posX + powerUp.width;
          const powerUpTop = powerUp.posY + this.translateY;
          const powerUpBottom = powerUp.posY + powerUp.height + this.translateY;

          if (
            playerLeft < powerUpRight &&
            playerRight > powerUpLeft &&
            playerBottom >= powerUpTop &&
            playerTop < powerUpBottom
          ) {
            if (powerUp instanceof HighJumpPower) {
              player.activateHighJump();
            }
            if (powerUp instanceof ExtraLifePower) {
              player.activateExtraLife();
            }
            this.powerUps = this.powerUps.filter((p) => p !== powerUp);
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
      // create a new array that excludes start-platform image and gif
      const platformOnlyImages = this.platformImages.slice(2);
      const isBreakable = random() < 0.2;
      // if isBreakable = true then use imageIndex 0 or else 1
      const imageIndex = isBreakable ? 0 : 1;

      const newPlatform = new Platform(
        30,
        100,
        random(100, 1300),
        50 - this.translateY,
        platformOnlyImages,
        imageIndex,
        isBreakable,
        isBreakable ? 0 : 1,
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
      this.platformImages,
      0,
      false,
      1,
    );
    this.startPlatformSpawnTime = millis();
  }

  private checkForWinner() {
    const alivePlayers = this.players.filter((player) => player.isAlive);

    if (this.players.length === 1) {
      // Singleplayer-logik
      if (alivePlayers.length === 0) {
        game.changeScreen(new GameEnd(this.getPlayerTimes(), null));
      }
    } else {
      // Multiplayer-logik
      if (alivePlayers.length === 1) {
        const lastPlayerStanding = alivePlayers[0];
        lastPlayerStanding.onDeath = () => {
          const winnerIndex = this.players.indexOf(lastPlayerStanding);
          game.changeScreen(new GameEnd(this.getPlayerTimes(), winnerIndex));
        };
      }
    }
  }

  private getPlayerTimes() {
      return this.players.map((player, index) => ({
        playerNumber: index + 1,
        time: player.deathTime && player.startTime ? (player.deathTime - player.startTime) / 1000 : 0,
      }));
    }

  private spawnPowerUp() {
    this.powerUpTimer += deltaTime;
    if (this.powerUpTimer > this.powerUpInterval) {
      const powerUps = [
        new HighJumpPower(
          60,
          42,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          0,
        ),
        new ExtraLifePower(
          40,
          80,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          1,
        ),
        new ThrowYarnPower(
          45,
          60,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          2,
        ),
      ];
      this.powerUps.push(powerUps[floor(random(0, 3))]);

      // Reset timer
      this.powerUpTimer = 0;
    }
  }

  private removeOffScreenPowerUps() {
    this.powerUps = this.powerUps.filter(
      (powerUp) => powerUp.posY < height + this.translateY,
    );
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
      this.startPlatform.imageIndex = 1;
    }

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 7000) {
      this.startPlatform = null;
    }
    this.players.forEach((player) => {
      player.update();
      // when player falls off the screen they die
      if (player.posY > height) {
        player.die();
      }
    });

    this.translateY += this.speedUpCounter;

    this.detectHit();
    this.playerCollision();
    this.removeOffScreenPlatforms();
    this.spawnPowerUp();
    this.removeOffScreenPowerUps();
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
    fill("#F0AB63");
    rectMode(CORNER);
    stroke(0);
    strokeWeight(0);
    rect(0, 0, 1400, 55);

    let imgWidth = 55;
    let imgHeight = 45;
    let padding = 150;
    let powerUpSpace = 350;

    // Calculate available space for player icons
    let availableWidth = 1396 - powerUpSpace;

    // Calculate total width of all player icons
    let totalPlayersWidth =
      imgWidth * this.selectedPlayers + padding * (this.selectedPlayers - 1);

    // Center the players in the available space
    let startX = availableWidth - totalPlayersWidth;
    let startY = 1 + (55 - imgHeight) / 2;

    // Draw player images and apply opacity if they are dead
    this.players.forEach((player, index) => {
      if (!player.isAlive) {
        tint(255, 100); // Reduce opacity for dead players
      }

      if (index < this.selectedPlayers) {
        image(
          this.playerHeadImages[index],
          startX + (imgWidth + padding) * index,
          startY,
          imgWidth,
          imgHeight,
        );
      }

      if (player.hasExtraLife) {
        let imgWidth = 60;
        let imgHeight = 30;
        let lifeIconX = startX + (imgWidth + padding) * index + imgWidth + 5;
        let lifeIconY = startY;
        image(this.powerUpImages[1], lifeIconX, lifeIconY, imgWidth, imgHeight);
      }

      if (!player.isAlive) {
        noTint(); // Reset tint for other players
      }
    });
  }

  public draw() {
    push();
    this.drawBackground();
    this.players.forEach((player) => player.draw());
    this.time.drawCountdown();
    if (this.startPlatform) {
      this.startPlatform.drawPlatform();
    }

    this.drawTimerBorder();
    this.time.drawTimer();

    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.draw());
    this.powerUps.forEach((powerUp) => powerUp.draw());
    pop();
  }
}
