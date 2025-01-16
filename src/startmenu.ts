class StartMenu implements IScreen {
    private startButton: Button;
    private howToPlayButton: Button;

    constructor() {
        this.startButton = new Button('START', '#F96B6B', 350, 100, 500, 250);
        this.howToPlayButton = new Button('HOW TO PLAY', '#F0AB63', 350, 100, 500, 380);
    }

    private drawButtons() {
        this.startButton.draw();
        this.howToPlayButton.draw();
    }

    private drawTitle() {
        fill('#8B8985');
        textFont('Fredoka', 80)
        textStyle(BOLD);
        textAlign('center', 'center');
        text('PURRFECT LEAP', 705, 115);

        fill('#F96B6B');
        text('PURRFECT LEAP', 700, 110);

    }

    public update() {}

    public draw() {
        fill('#C2E1B5')
        noStroke();
        rect(390, 190, 580, 350, 50);
        this.drawTitle();
        this.drawButtons();
    }
}