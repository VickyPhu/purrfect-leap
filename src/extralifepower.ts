class ExtraLifePower extends GameEntity {
  private name: string;
  //   private soundFX: string;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number,
  ) {
    super(height, width, posX, posY, img, imageIndex);
    this.name = "extraLife";
  }

  private executePower() {}
}
