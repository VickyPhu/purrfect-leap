class Game {
  private startMenu: StartMenu;

  constructor() {
    this.startMenu = new StartMenu();
  }

  public update() {
      this.startMenu.update();

  }

  public draw() {
    background("lightblue");
    this.startMenu.draw();
  }
  

  public changeScreen(screen: any) {
    
  }
}
