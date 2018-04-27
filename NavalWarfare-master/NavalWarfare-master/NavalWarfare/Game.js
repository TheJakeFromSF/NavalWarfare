
//there are three similar parts, they are to run easy, normal or hard game mode.
(function () {

    //easy game mode
    function PlayEasyMode() {
        this.initialize();
    }

    var p = PlayEasyMode.prototype = new createjs.Container();

    p.initialize = function () {
        stage.removeAllChildren();

        createBackGround();
        createFrigate();
        createPirateShip(720, 100);

        var spritesheet = new createjs.SpriteSheet(data);
        reloadingImage = new createjs.Sprite(spritesheet, 'reloading');
        reloadingImage.x = 50; reloadingImage.y = 750;
        stage.addChild(reloadingImage);

        textboard = new createjs.Text("Cannons Loaded", "32px Arial", "white");
        textboard.x = 150; textboard.y = 800;
        stage.addChild(textboard);

        setControls();
        launchCannons();
    } 

    p.run = function (tickEvent) {

        //update ticker events.
        if (!tickEvent.paused) {
            this.checkGame();
            UpdateAI();
            frigate.update();
            stage.update();
        }  
    }

    //check if any ship destroyed, and have the cannons loaded.
    p.checkGame = function () {
        var i;
        for (i = 0; i < allPirateShips.length; i++) {
            allPirateShips[i].update();

            if (allPirateShips[i].HP <= 0) {
                createWreck(allPirateShips[i].x, allPirateShips[i].y, allPirateShips[i].rotation);
                stage.removeChild(allPirateShips[i]);
                allPirateShips.splice(allPirateShips.indexOf(allPirateShips[i]), 1);
            }
        }

        //if player destroyed all pirates.
        if (allPirateShips.length == 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.GAME_WINNING);
        }

        //if player loose.
        if (frigate.HP <= 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.EASY_GAME_OVER);
        }

        //check if players cannons loaded.
        const reloadingTime = 3000;
        var checkCannonLoaded = new Date().getTime();
        loaded();

        function loaded() {
            var distance = checkCannonLoaded - startLoadCannon;
            var reloadText;

            if (distance > reloadingTime) {
                textboard.text = "Cannons Loaded";
                frigate.loaded = true;
            }
            else {
                reloadText = parseFloat((reloadingTime - distance) / 1000).toFixed(1);
                textboard.text = "Reloading: " + reloadText.toString();
                frigate.loaded = false;
            }
        }

        for (i = 0; i < cannonballs.length; i++) {
            cannonballs[i].update();
        }
    }

    window.PlayEasyMode = PlayEasyMode;

}());

//normal mode. same story as easy mode.
(function () {

    function PlayNormalMode() {
        this.initialize();
    }

    var p = PlayNormalMode.prototype = new createjs.Container();

    p.initialize = function () {
        stage.removeAllChildren();

        createBackGround();
        createFrigate();
        createPirateShip(100, 100);
        createPirateShip(1100, 100);

        var spritesheet = new createjs.SpriteSheet(data);
        reloadingImage = new createjs.Sprite(spritesheet, 'reloading');
        reloadingImage.x = 50; reloadingImage.y = 750;
        stage.addChild(reloadingImage);

        textboard = new createjs.Text("Cannons Loaded", "32px Arial", "white");
        textboard.x = 150; textboard.y = 800;
        stage.addChild(textboard);

        setControls();
        launchCannons();
    }

    p.run = function (tickEvent) {
        if (!tickEvent.paused) {
            this.checkGame();
            UpdateAI();
            frigate.update();
            stage.update();
        }
    }

    p.checkGame = function () {
        var i;
        for (i = 0; i < allPirateShips.length; i++) {
            allPirateShips[i].update();

            if (allPirateShips[i].HP <= 0) {
                createWreck(allPirateShips[i].x, allPirateShips[i].y, allPirateShips[i].rotation);
                stage.removeChild(allPirateShips[i]);
                allPirateShips.splice(allPirateShips.indexOf(allPirateShips[i]), 1);
            }
        }

        if (allPirateShips.length == 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.GAME_WINNING);
        }

        if (frigate.HP <= 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.NORMAL_GAME_OVER);
        }

        const reloadingTime = 3000;
        var checkCannonLoaded = new Date().getTime();
        loaded();

        function loaded() {
            var distance = checkCannonLoaded - startLoadCannon;
            var reloadText;

            if (distance > reloadingTime) {
                textboard.text = "Cannons Loaded";
                frigate.loaded = true;
            }
            else {
                reloadText = parseFloat((reloadingTime - distance) / 1000).toFixed(1);
                textboard.text = "Reloading: " + reloadText.toString();
                frigate.loaded = false;
            }
        }

        for (i = 0; i < cannonballs.length; i++) {
            cannonballs[i].update();
        }
    }

    window.PlayNormalMode = PlayNormalMode;

}());

//hard mode. same story as easy and normal mode.
(function () {

    function PlayHardlMode() {
        this.initialize();
    }

    var p = PlayHardlMode.prototype = new createjs.Container();

    p.initialize = function () {
        stage.removeAllChildren();

        createBackGround();
        createFrigate();
        createPirateShip(100, 100);
        createPirateShip(720, 200);
        createPirateShip(1100, 100);

        var spritesheet = new createjs.SpriteSheet(data);
        reloadingImage = new createjs.Sprite(spritesheet, 'reloading');
        reloadingImage.x = 50; reloadingImage.y = 750;
        stage.addChild(reloadingImage);

        textboard = new createjs.Text("Cannons Loaded", "32px Arial", "white");
        textboard.x = 150; textboard.y = 800;
        stage.addChild(textboard);

        setControls();
        launchCannons();
    }

    p.run = function (tickEvent) {
        if (!tickEvent.paused) {
            this.checkGame();
            UpdateAI();
            frigate.update();
            stage.update();
        }
    }

    p.checkGame = function () {
        var i;
        for (i = 0; i < allPirateShips.length; i++) {
            allPirateShips[i].update();

            if (allPirateShips[i].HP <= 0) {
                createWreck(allPirateShips[i].x, allPirateShips[i].y, allPirateShips[i].rotation);
                stage.removeChild(allPirateShips[i]);
                allPirateShips.splice(allPirateShips.indexOf(allPirateShips[i]), 1);
            }
        }

        if (allPirateShips.length == 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.GAME_WINNING);
        }

        if (frigate.HP <= 0) {
            allPirateShips = [];
            cannonballs = [];
            stage.removeAllChildren();

            this.dispatchEvent(GameStateEvents.HARD_GAME_OVER);
        }

        const reloadingTime = 3000;
        var checkCannonLoaded = new Date().getTime();
        loaded();

        function loaded() {
            var distance = checkCannonLoaded - startLoadCannon;
            var reloadText;

            if (distance > reloadingTime) {
                textboard.text = "Cannons Loaded";
                frigate.loaded = true;
            }
            else {
                reloadText = parseFloat((reloadingTime - distance) / 1000).toFixed(1);
                textboard.text = "Reloading: " + reloadText.toString();
                frigate.loaded = false;
            }
        }

        for (i = 0; i < cannonballs.length; i++) {
            cannonballs[i].update();
        }
    }

    window.PlayHardlMode = PlayHardlMode;

}());

//create player ship.
function createFrigate() {
    frigate = new Frigate();
    stage.addChild(frigate);
}

//each time create computer ship at specific position x, y.
function createPirateShip(x, y) {
    var pirateShip = new PirateShip();
    pirateShip.x = x; pirateShip.y = y;
    allPirateShips.push(pirateShip);
    stage.addChild(pirateShip);
}

//display a wreck after any ship is destroyed
function createWreck(x, y, rotation) {
    var image = queue.getResult("shipwreck");

    var bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = 0.3; bitmap.scaleY = 0.3;
    bitmap.regX = 312; bitmap.regY = 320;
    bitmap.x = x; bitmap.y = y;
    bitmap.rotation = rotation + 180;

    stage.addChild(bitmap);
}

function createBackGround() {
    var image = queue.getResult("BG");

    var bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = 2.3; bitmap.scaleY = 0.65;
    bitmap.x = 0; bitmap.y = 0;

    stage.addChild(bitmap);
}