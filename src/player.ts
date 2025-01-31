class Player extends GameEntity {
  private name: string;
  public velocity: number;
  public horizontalVelocity: number;
  private gravity: number;
  private bounceVelocity: number;
  private soundFX: string;
  private keyReleased: boolean;
  private lastDirection: string;
  public playerImages: p5.Image[];
  public controls: { left: number; right: number; action: number };
  public isAlive: boolean;
  public onDeath: (() => void) | null = null;
  private highJumpActive: boolean = false;
  public deathTime: number | null = null;
  public startTime: number | null = null;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    playerImages: p5.Image[],
    imageIndex: number,
    controls: { left: number; right: number; action: number },
  ) {
    super(height, width, posX, posY, img, imageIndex);
    this.isAlive = true;

    this.name = "Player1";
    this.velocity = 0;
    this.horizontalVelocity = 0;
    this.gravity = 0.5;
    this.soundFX = "";
    this.bounceVelocity = -15;
    this.keyReleased = false;
    this.lastDirection = "right";
    this.playerImages = playerImages;
    this.controls = controls;
    this.isAlive = true;
    this.deathTime = null;
  }

  private bounceAnimation() {
    this.keyReleased = false;
    if (keyIsDown(this.controls.right) === true) {
      this.keyReleased = true;
      this.lastDirection = "right";
      if (this.velocity < -10) {
        this.imageIndex = 0;
      } else if (this.velocity < -3) {
        this.imageIndex = 1;
      } else if (this.velocity < 10) {
        this.imageIndex = 2;
      } else {
        this.imageIndex = 3;
      }
    } else if (keyIsDown(this.controls.left) === true) {
      this.keyReleased = true;
      this.lastDirection = "left";
      if (this.velocity < -10) {
        this.imageIndex = 4;
      } else if (this.velocity < -3) {
        this.imageIndex = 5;
      } else if (this.velocity < 10) {
        this.imageIndex = 6;
      } else {
        this.imageIndex = 7;
      }
    }

    if (!this.keyReleased) {
      if (this.lastDirection === "right") {
        if (this.velocity < -10) {
          this.imageIndex = 0;
        } else if (this.velocity < -3) {
          this.imageIndex = 1;
        } else if (this.velocity < 10) {
          this.imageIndex = 2;
        } else {
          this.imageIndex = 3;
        }
      } else if (this.lastDirection === "left") {
        if (this.velocity < -10) {
          this.imageIndex = 4;
        } else if (this.velocity < -3) {
          this.imageIndex = 5;
        } else if (this.velocity < 10) {
          this.imageIndex = 6;
        } else {
          this.imageIndex = 7;
        }
      }
      // }
      //   // If player is not moving continue animation based on last direction (left or right)
      //   if (!this.keyReleased) {
      //     if (this.lastDirection === "right") {
      //       this.imageIndex = Math.floor((frameCount / 10) % 4);
      //     } else if (this.lastDirection === "left") {
      //       this.imageIndex = 4 + Math.floor((frameCount / 10) % 4); // +4 to use imageIndex 4-7
      //     }
      //   }
    }
  }

  public activateHighJump() {
    this.highJumpActive = true;
  }

  public activateExtraLife() {
    this.hasExtraLife = true;
  }

  public automaticBounce(platformTop: number) {
    const originalPlatformTop = platformTop;
    if (this.posY + this.height > originalPlatformTop) {
      this.posY = originalPlatformTop - this.height;
      this.velocity = this.bounceVelocity;
    }
    this.bounceAnimation();
    if (this.highJumpActive) {
      this.velocity = Math.max(this.bounceVelocity * 2, -25); // Prevents extreme jumps
      this.highJumpActive = false;
    }
  }

  private leftAndRight() {
    if (keyIsDown(this.controls.left) === true) {
      this.posX -= 6;
    }

    if (keyIsDown(this.controls.right) === true) {
      this.posX += 6;
    }
  }

  private wallJumper() {
    if (this.posX > 1350) {
      this.posX = 0;
    } else if (this.posX < -50) {
      this.posX = 1340;
    }
  }

  public update() {
        // Om starttiden inte är satt, sätt den till nuvarande tid
        if (this.startTime === null) {
          this.startTime = millis();
        }

    this.velocity += this.gravity;
    this.posY += this.velocity;
    this.bounceAnimation();
    this.leftAndRight();
    this.wallJumper();
  }

  public die() {
    if (this.deathTime === null && this.startTime !== null) {
      this.deathTime = millis();
    }
    // game.changeScreen(new GameEnd());
    this.isAlive = false;
    if (this.onDeath) {
      this.onDeath();
    }
  }

  private revive() {
    console.log("Player revived! Jumping to top.");

    this.hasExtraLife = false;
    this.isReviving = true;

    this.velocity = -height / 40;
    this.gravity = 0.1;

    let targetHeight = height * 0.1;

    let jumpInterval = setInterval(() => {
      if (this.posY > targetHeight) {
        this.velocity += this.gravity;
        this.posY += this.velocity;
      } else {
        clearInterval(jumpInterval);
        console.log("Player reached top. Staying for 2 seconds.");

        this.velocity = 0;
        this.gravity = 0;

        setTimeout(() => {
          console.log("Player resumes normal gravity.");
          this.gravity = 0.5;
          this.isReviving = false;
        }, 2000);
      }
    }, 30);
  }
}
