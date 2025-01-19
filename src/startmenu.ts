class StartMenu implements IScreen {
    private startButton: Button;
    private howToPlayButton: Button;

    constructor() {
        this.startButton = new Button('START', '#F96B6B', width * 0.5, 280, 350, 100);
        this.howToPlayButton = new Button('HOW TO PLAY', '#F0AB63', width * 0.5, 410, 350, 100);
    }

    private drawButtons() {
        this.startButton.draw();
        this.howToPlayButton.draw();
    }

    private drawTitle() {
        push();
        fill('#8B8985');
        textFont('Fredoka', 80)
        textStyle(BOLD);
        textAlign('center', 'center');
        text('PURRFECT LEAP', 705, 105);

        fill('#F96B6B');
        text('PURRFECT LEAP', 700, 100);
        pop();
    }

    public update() {}

    public draw() {
        push();
        rectMode(CENTER);
        fill('#C2E1B5')
        noStroke();
        rect(width * 0.5, 350, 580, 340, 50);
        pop();
        this.drawTitle();
        this.drawButtons();
    }
}