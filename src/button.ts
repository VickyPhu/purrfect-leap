class Button {
  private text: string;
  private color: string;
  private width: number;
  private height: number;
  private posX: number;
  private posY: number;

  constructor(
    text: string,
    color: string,
    width: number,
    height: number,
    posX: number,
    posY: number
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
    //create button

    //Text in button
    fill("#000");
    textFont("20px Arial"); //test, should be Fredrika One
    textAlign("center");
    text(this.text, this.posY + this.width / 2, this.posY + this.height / 2);
  }
}
