
//stage and queue
var queue;
var stage;

//player's frigate
var frigate;

var reloadingImage;
var textboard;
var audio;

//arrays to store computers ships and cannonballs have been lunched.
var allPirateShips = [];
var cannonballs = [];

//game start.
var startLoadCannon = new Date().getTime();

//sprites data
data = {
    images: ["Assets/reloading.png"],
    frames: { width: 128, height: 128, count: 3 },
    animations: {
        reloading: [0, 2, 'reloading', 0.1],
    }
};

//preload
function load() {
    queue = new createjs.LoadQueue(false);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "frigate", src: "Assets/frigate.png" },
        { id: "pirateship", src: "Assets/pirateship.png" },
        { id: "shipwreck", src: "Assets/shipwreck.png" },
        { id: "menu_background", src: "Assets/menu.jpg" },
        { id: "game_winning", src: "Assets/GameWinning.jpg" },
        { id: "game_over", src: "Assets/GameOver.jpg" },
        { id: "BG", src: "Assets/BG.gif" },
        { id: "muzzleSound", src: "Assets/muzzle_sound.mp3" }
    ]);
}

//run game scene
function init() {
    main = new GameRunning();
}