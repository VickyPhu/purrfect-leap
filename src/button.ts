class Button {
  private text: string;
  private color: string;
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;

  constructor(
    text: string,
    color: string,
    posX: number,
    posY: number,
    width: number,
    height: number,
  ) {
    this.text = text;
    this.color = color;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
  }

  public draw() {
    //Button
    fill(this.color);
    noStroke();
    rect(this.posX, this.posY, this.width, this.height, 20);

    //Text in button
    fill("#000");
    textFont("Fredoka", 45);
    textAlign("center","center");
    text(this.text, this.posX + this.width / 2, this.posY + this.height / 2);
  }
}
