class PlayerSelect implements IScreen {
  private playerSelectButton1: Button;
  private playerSelectButton2: Button;
  private playerSelectButton3: Button;
  private playerSelectButton4: Button;
  private gameStartButton: Button;
  private activeButtonIndex: number;
  private lastKeyPressed: string | null;
  private playerImage1: p5.Image;
  private playerImage2: p5.Image;
  private playerImage3: p5.Image;
  private playerImage4: p5.Image;
  private prevIsKeyPressed: boolean;
  private lastPlayerButtonIndex: number | null;
  private selectedPlayers: number;

  constructor() {
    this.playerSelectButton1 = new Button(
      "1 PLAYER",
      "#F96B6B",
      210,
      80,
      250,
      100,
      0,
    );
    this.playerSelectButton2 = new Button(
      "2 PLAYER",
      "#C2E1B5",
      535,
      80,
      250,
      100,
      1,
    );
    this.playerSelectButton3 = new Button(
      "3 PLAYER",
      "#F0AB63",
      855,
      80,
      250,
      100,
      2,
    );
    this.playerSelectButton4 = new Button(
      "4 PLAYER",
      "#CBA3D2",
      1185,
      80,
      250,
      100,
      3,
    );
    this.gameStartButton = new Button(
      "START GAME",
      "#F96B6B",
      698,
      500,
      350,
      150,
      4,
    );

    this.activeButtonIndex = 0;
    this.lastKeyPressed = null;
    this.prevIsKeyPressed = keyIsPressed;
    this.lastPlayerButtonIndex = null;
    this.selectedPlayers = 0;

    this.playerImage1 = loadImage("/assets/images/cats/Player1Head.png");
    this.playerImage2 = loadImage("/assets/images/cats/Player2Head.png");
    this.playerImage3 = loadImage("/assets/images/cats/Player3Head.png");
    this.playerImage4 = loadImage("/assets/images/cats/Player4Head.png");
  }

  private drawButtons() {
    this.playerSelectButton1.draw(
      this.activeButtonIndex === 0 || this.lastPlayerButtonIndex === 0,
    );
    this.playerSelectButton2.draw(
      this.activeButtonIndex === 1 || this.lastPlayerButtonIndex === 1,
    );
    this.playerSelectButton3.draw(
      this.activeButtonIndex === 2 || this.lastPlayerButtonIndex === 2,
    );
    this.playerSelectButton4.draw(
      this.activeButtonIndex === 3 || this.lastPlayerButtonIndex === 3,
    );
    this.gameStartButton.draw(this.activeButtonIndex === 4);
  }

  private drawPlayerImages() {
    image(this.playerImage1, 160, 160, 120, 100);
    image(this.playerImage1, 460, 160, 120, 100);
    image(this.playerImage2, 530, 185, 120, 100);
    image(this.playerImage1, 780, 160, 120, 100);
    image(this.playerImage2, 850, 185, 120, 100);
    image(this.playerImage3, 760, 220, 120, 100);
    image(this.playerImage1, 1105, 160, 120, 100);
    image(this.playerImage2, 1175, 185, 120, 100);
    image(this.playerImage3, 1085, 220, 120, 100);
    image(this.playerImage4, 1170, 240, 130, 110);
  }

  private activateButton(index: number) {
    if (index === 0) {
      this.selectedPlayers = 1;
    } else if (index === 1) {
      this.selectedPlayers = 2;
    } else if (index === 2) {
      this.selectedPlayers = 3;
    } else if (index === 3) {
      this.selectedPlayers = 4;
    } else if (index === 4) {

      if (this.selectedPlayers > 0) {
        const playerImages: p5.Image[][] = [
          [
            loadImage("/assets/images/cats/Player11.png"),
            loadImage("/assets/images/cats/Player12.png"),
            loadImage("/assets/images/cats/Player13.png"),
            loadImage("/assets/images/cats/Player14.png"),
            loadImage("/assets/images/cats/Player11M.png"),
            loadImage("/assets/images/cats/Player12M.png"),
            loadImage("/assets/images/cats/Player13M.png"),
            loadImage("/assets/images/cats/Player14M.png"),
          ],
          [
            loadImage("/assets/images/cats/Player21.png"),
            loadImage("/assets/images/cats/Player22.png"),
            loadImage("/assets/images/cats/Player23.png"),
            loadImage("/assets/images/cats/Player24.png"),
            loadImage("/assets/images/cats/Player21M.png"),
            loadImage("/assets/images/cats/Player22M.png"),
            loadImage("/assets/images/cats/Player23M.png"),
            loadImage("/assets/images/cats/Player24M.png"),
          ],
          [
            loadImage("/assets/images/cats/Player31.png"),
            loadImage("/assets/images/cats/Player32.png"),
            loadImage("/assets/images/cats/Player33.png"),
            loadImage("/assets/images/cats/Player34.png"),
            loadImage("/assets/images/cats/Player31M.png"),
            loadImage("/assets/images/cats/Player32M.png"),
            loadImage("/assets/images/cats/Player33M.png"),
            loadImage("/assets/images/cats/Player34M.png"),
          ],
          // add images for player 4
        ];

        const controls = [
          { left: 37, right: 39, action: 38 }, // LeftArrow, RightArrow, UpArrow
          { left: 81, right: 69, action: 87 }, // Q, E, W
          { left: 73, right: 80, action: 79 }, // I, P, O
          { left: 90, right: 67, action: 88 }, // Z, C, X
        ];

        const players: Player[] = [];
        for (let i = 0; i < this.selectedPlayers; i++) {
          players.push(
            new Player(
              150,
              200,
              200,
              300,
              playerImages[i],
              playerImages[i],
              0,
              controls[i],
            ),
          );
        }
        const gameBoard = new GameBoard(players);
        game.changeScreen(gameBoard);
      } 
    }
  }

  public update() {
    const pressedThisFrame = keyIsPressed && !this.prevIsKeyPressed;

    if (pressedThisFrame) {
      if (keyCode === LEFT_ARROW && this.lastKeyPressed !== "LEFT") {
        if (this.activeButtonIndex !== 4) {
          this.activeButtonIndex = (this.activeButtonIndex - 1 + 4) % 4;
        }
        this.lastKeyPressed = "LEFT";
      } else if (keyCode === RIGHT_ARROW && this.lastKeyPressed !== "RIGHT") {
        if (this.activeButtonIndex !== 4) {
          this.activeButtonIndex = (this.activeButtonIndex + 1) % 4;
        }
        this.lastKeyPressed = "RIGHT";
      } else if (keyCode === ENTER) {
        if (this.activeButtonIndex !== 4) {
          // activeIndexButton has values 0-3 for the players, this sets the selectedPlayers based on which option is selected, + 1 cause selectedPlayers starts with 0 and for each player its + 1
          this.selectedPlayers = this.activeButtonIndex + 1;
          this.lastPlayerButtonIndex = this.activeButtonIndex;
          this.activeButtonIndex = 4;
        } else {
          // Start game with the amount of chosen players
          if (this.selectedPlayers > 0) {
            this.activateButton(4);
          } 
        }
      }
    }

    if (!keyIsPressed && this.prevIsKeyPressed) {
      this.lastKeyPressed = null;
    }

    this.prevIsKeyPressed = keyIsPressed;
  }

  public draw() {
    fill("#F0DEB5");
    noStroke();
    rect(390, 190, 580, 350, 50);
    this.drawButtons();
    this.drawPlayerImages();
  }
}
