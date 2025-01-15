class GameEntity {
    public height: number;
    public width: number;
    public posX: number;
    public posY: number;
    public img: p5.image[];
    public imageIndex: [];

    public draw(): void;
    public update(): void;
}