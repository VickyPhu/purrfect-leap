class StartMenu implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;
  private enterKeyHasBeenReleased: boolean;
  private ignoreInputUntil: number;
  private isMusicMuted: boolean;

  constructor() {
    this.enterKeyHasBeenReleased = false;
    this.ignoreInputUntil = millis() + 200;
    this.buttons = [
      new Button(
        "START",
        "#F96B6B",
        width * 0.5,
        280,
        350,
        100,
        0,
        sound.chooseSound,
      ),
      new Button(
        "HOW TO PLAY",
        "#F0AB63",
        width * 0.5,
        410,
        350,
        100,
        1,
        sound.chooseSound,
      ),
      new Button("Music", "#F0AB63", 125, 75, 200, 70, 2, sound.chooseSound),
    ];
    sound.gameOverMusic.stop();
    if (!sound.menuMusic.isPlaying()) {
      sound.menuMusic.play();
    }
    this.activeButtonIndex = 0;
    this.isMusicMuted = globalMusicMuted; // Get global music state
  }

  private drawButtons() {
    this.buttons.forEach((button) => {
      button.draw(button.buttonIndex === this.activeButtonIndex);
    });
  }

  private drawTitle() {
    push();
    fill("#8B8985");
    textFont("Fredoka", 80);
    textStyle(BOLD);
    textAlign("center", "center");
    text("PURRFECT LEAP", 705, 105);

    fill("#F96B6B");
    text("PURRFECT LEAP", 700, 100);
    pop();
  }

  public update() {
    if (millis() < this.ignoreInputUntil) return; // Ignorera input tills fördröjningen passerat

    if (keyIsDown(ENTER) && this.enterKeyHasBeenReleased) {
      this.enterKeyHasBeenReleased = false;
      this.buttons[this.activeButtonIndex].handleActivate();

      if (this.activeButtonIndex === 0) {
        game.changeScreen(new PlayerSelect());
      } else if (this.activeButtonIndex === 1) {
        game.changeScreen(new HowToPlay());
      } else if (this.activeButtonIndex === 2) {
        // Toggle music state
        this.isMusicMuted = !this.isMusicMuted;
        globalMusicMuted = this.isMusicMuted; // Store globally

        sound.gameMusic.setVolume(this.isMusicMuted ? 0 : 0.5);
        sound.menuMusic.setVolume(this.isMusicMuted ? 0 : 0.3);
        sound.gameOverMusic.setVolume(this.isMusicMuted ? 0 : 0.2);
      }
    }

    if (keyIsDown(DOWN_ARROW) && this.enterKeyHasBeenReleased) {
      this.activeButtonIndex =
        (this.activeButtonIndex + 1) % this.buttons.length;
      this.enterKeyHasBeenReleased = false;
    } else if (keyIsDown(UP_ARROW) && this.enterKeyHasBeenReleased) {
      this.activeButtonIndex =
        (this.activeButtonIndex - 1 + this.buttons.length) %
        this.buttons.length;
      this.enterKeyHasBeenReleased = false;
    }

    if (!keyIsDown(DOWN_ARROW) && !keyIsDown(UP_ARROW) && !keyIsDown(ENTER)) {
      this.enterKeyHasBeenReleased = true;
    }
  }

  public draw() {
    push();
    rectMode(CENTER);
    fill("#C2E1B5");
    noStroke();
    rect(width * 0.5, 350, 580, 340, 50);
    pop();
    this.drawTitle();
    this.drawButtons();
  }
}
