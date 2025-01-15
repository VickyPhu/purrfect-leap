class Game {
  public update() {
    this.position.set(mouseX, mouseY);
    this.isCircleVisible = mouseIsPressed;

    if (mouseIsPressed) {
      if (!music.mystery.isPlaying()) {
        music.mystery.loop();
      }
    } else {
      music.mystery.pause();
    }
  }

  public draw() {
    background("black");
    this.drawText();

    if (this.isCircleVisible) {
      this.drawCircle();
    }
  }

  public changeScreen(screen) {
    HEJ!;
  }
}
