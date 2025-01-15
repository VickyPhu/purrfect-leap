import { Button } from './button.js';
import { Screen } from './screen.js';

export class StartMenu implements Screen {
    private startButton: Button;
    private howToPlayButton: Button;

    constructor() {
        this.startButton = new Button('START', '#F96B6B', 100, 50, 750, 280);
        this.howToPlayButton = new Button('HOW TO PLAY', '#F0AB63', 100, 50, 750, 400);
    }

    private drawButtons() {}
    private drawTitle() {}

    public update() {}

    public draw() {}
}