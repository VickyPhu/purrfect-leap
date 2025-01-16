class Player extends GameEntity {
  private name: string;
  private velocity: number;
  private gravity: number;
  private soundFX: string;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number
  ) {
    super(height, width, posX, posY, img, imageIndex);

    this.name = "Player1";
    this.velocity = 0;
    this.gravity = 0.5;
    this.soundFX = "";
  }

  private automaticBounce() {}
  private leftAndRight() {}
  public die() {}
  public renderPlayer() {
    super.draw();
  }
}
