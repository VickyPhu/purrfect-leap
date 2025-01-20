class PlayerSelect implements IScreen {
  private playerSelectButton1: Button;
  private playerSelectButton2: Button;
  private playerSelectButton3: Button;
  private playerSelectButton4: Button;
  private gameStartButton: Button;
  private activeButtonIndex: number;

  constructor() {
    this.playerSelectButton1 = new Button('1 PLAYER', '#F96B6B', 90, 20, 250, 100, 0);
    this.playerSelectButton2 = new Button('2 PLAYER', '#C2E1B5', 415, 20, 250, 100, 1);
    this.playerSelectButton3 = new Button('3 PLAYER', '#F0AB63', 745, 20, 250, 100, 2);
    this.playerSelectButton4 = new Button('4 PLAYER', '#CBA3D2', 1065, 20, 250, 100, 3);
    this.gameStartButton = new Button('START GAME', '#F96B6B', 525, 450, 350, 150, 4);
    this.activeButtonIndex = 0; // Default to the first button
  }

  // Draw all buttons, highlighting the active one
  private drawButtons() {
    this.playerSelectButton1.draw(this.activeButtonIndex === 0);
    this.playerSelectButton2.draw(this.activeButtonIndex === 1);
    this.playerSelectButton3.draw(this.activeButtonIndex === 2);
    this.playerSelectButton4.draw(this.activeButtonIndex === 3);
    this.gameStartButton.draw(this.activeButtonIndex === 4);
  }

  // Handle button activation (Enter key)
  private activateButton(index: number) {
    if (index === 0) {
      console.log("1 PLAYER selected");
    } else if (index === 1) {
      console.log("2 PLAYER selected");
    } else if (index === 2) {
      console.log("3 PLAYER selected");
    } else if (index === 3) {
      console.log("4 PLAYER selected");
    } else if (index === 4) {
      console.log("START GAME selected");
    }
  }

  // Update active button index based on arrow key input
  public update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.activeButtonIndex = (this.activeButtonIndex - 1 + 5) % 5; // Cycle left through 5 buttons
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.activeButtonIndex = (this.activeButtonIndex + 1) % 5; // Cycle right through 5 buttons
    } else if (keyIsDown(ENTER)) {
      this.activateButton(this.activeButtonIndex); // Activate the currently selected button
    }
  }

  // Draw everything
  public draw() {
    fill('#F0DEB5');
    noStroke();
    rect(390, 190, 580, 350, 50); // Background rectangle
    this.drawButtons(); // Draw all buttons
  }
}
