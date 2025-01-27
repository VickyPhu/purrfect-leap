class Player extends GameEntity {
  private name: string;
  private velocity: number;
  private gravity: number;
  private bounceVelocity: number;
  private soundFX: string;
  private keyReleased: boolean;
  private lastDirection: string;
  public playerImages: p5.Image[];
  public controls: { left: number; right: number; action: number; };

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    playerImages: p5.Image[],
    imageIndex: number,
    controls: { left: number; right: number; action: number; },
  ) {
    super(height, width, posX, posY, img, imageIndex);

    this.name = "Player1";
    this.velocity = 0;
    this.gravity = 0.5;
    this.soundFX = "";
    this.bounceVelocity = -15;
    this.keyReleased = false;
    this.lastDirection = "right";
    this.playerImages = playerImages;
    this.controls = controls;
  }

  private bounceAnimation() {
    if (typeof this.controls.right !== "number" || typeof this.controls.left !== "number") {
      console.error("Invalid controls detected:", this.controls);
      return;
    }
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
    // If player is not moving continue animation based on last direction (left or right)
    if (!this.keyReleased) {
      if (this.lastDirection === "right") {
        this.imageIndex = Math.floor((frameCount / 10) % 4);
      } else if (this.lastDirection === "left") {
        this.imageIndex = 4 + Math.floor((frameCount / 10) % 4); // +4 to use imageIndex 4-7
      }
    }
  }

  private automaticBounce() {
    this.velocity += this.gravity;

    this.posY += this.velocity;

    if (this.posY + this.height > height) {
      this.posY = height - this.height;
      this.velocity = this.bounceVelocity;
    }
    this.bounceAnimation();
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
    this.automaticBounce();
    this.leftAndRight();
    this.wallJumper();
  }

  public draw() {
    if (this.playerImages && this.playerImages.length > 0) {
      image(
        this.playerImages[this.imageIndex],
        this.posX,
        this.posY,
        this.width,
        this.height,
      );
      // rita ut entitet med p5 metoder
    }
  }
  public die() {}
}
