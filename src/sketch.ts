//---- GLOBAL VARIABLES ----//
let game: Game;
let sound: {
  chooseSound: p5.SoundFile;
  enterSound: p5.SoundFile;
  retrySound: p5.SoundFile;
  menuSound: p5.SoundFile;
  menuMusic: p5.SoundFile;
  catSound1: p5.SoundFile;
  catSound2: p5.SoundFile;
  catSound3: p5.SoundFile;
  catSound4: p5.SoundFile;
  gameMusic: p5.SoundFile;
  gameOverMusic: p5.SoundFile;
};
// let playerImages: p5.Image[];
let playerSelect: PlayerSelect;

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  sound = {
    chooseSound: loadSound("/assets/sounds/button-pressed.mp3"),
    enterSound: loadSound("/assets/sounds/button-pressed.mp3"),
    retrySound: loadSound("/assets/sounds/button-pressed.mp3"),
    menuSound: loadSound("/assets/sounds/boing.mp3"),
    catSound1: loadSound("/assets/sounds/1playerCat.mp3"),
    catSound2: loadSound("/assets/sounds/2playerCat.mp3"),
    catSound3: loadSound("/assets/sounds/3playerCat.mp3"),
    catSound4: loadSound("/assets/sounds/4playerCat.mp3"),
    menuMusic: loadSound("/assets/music/menuMusic.mp3"),
    gameMusic: loadSound("/assets/music/Mirisongtest.mp3"),
    gameOverMusic: loadSound("/assets/music/gameOver.mp3"),
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(1400, 700);
  frameRate(60);
  sound.chooseSound.setVolume(0.2);
  sound.enterSound.setVolume(0.2);
  sound.retrySound.setVolume(0.2);
  sound.menuSound.setVolume(0.2);
  sound.catSound1.setVolume(0.2);
  sound.catSound2.setVolume(0.2);
  sound.catSound3.setVolume(0.2);
  sound.catSound4.setVolume(0.2);

  sound.menuMusic.setVolume(0);
  sound.gameMusic.setVolume(0);
  sound.gameOverMusic.setVolume(0);
  game = new Game();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}

function keyPressed() {
  userStartAudio();
}

function mousePressed() {
  userStartAudio();
}
