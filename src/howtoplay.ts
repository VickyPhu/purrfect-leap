class HowToPlay implements IScreen {
  private returnButton: Button;

  constructor() {
    this.returnButton = new Button();
  }

  public update() {}

  public draw() {
    this.drawTitle();
    this.drawText();
    this.drawButtons();
    this.drawInstructionImage();
  }

  private drawTitle() {}

  private drawText() {}

  private drawButtons() {
    this.returnButton.draw();
  }

  private drawInstructionImage() {}
}
