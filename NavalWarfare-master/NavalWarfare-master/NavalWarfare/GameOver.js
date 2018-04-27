
//Hung Dao 3/30/18
(function () {


    //game over scence. there are three of them so it is eaiser to track the game state that player lost the game.
    function easyGameOver() { this.initialize(); }

    var p = easyGameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        stage.removeAllChildren();

        this.Container_initialize();
        this.addBackground();
        this.addText();
        this.addButtons();
    }

    p.addBackground = function () {
        var image = queue.getResult("game_over");
        var bitmap = new createjs.Bitmap(image);
        bitmap.scaleX = 0.75; bitmap.scaleY = 0.84;
        this.addChild(bitmap);
    }

    p.addText = function () {
        textboard = new createjs.Text("You Lose", "72px Arial", "black");
        textboard.x = 530; textboard.y = 100;
        this.addChild(textboard);
    }

    p.addButtons = function () {
        var btn = new ui.SimpleButton('Play Again');
        var btn2 = new ui.SimpleButton('    Menu    ');

        btn.setFontSize(42);
        btn.setUpColor('#A9BBC9');
        btn.on('click', this.playAgain, this);

        btn2.setFontSize(42);
        btn2.setUpColor('#A9BBC9');
        btn2.on('click', this.Menu, this);

        btn.x = 360; btn2.x = 820;
        btn.y = btn2.y = 650;

        this.addChild(btn, btn2);
    }

    p.playAgain = function (e) {
        this.dispatchEvent(GameStateEvents.EASY_GAME);
    }

    p.Menu = function (e) {
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }

    p.run = function (tickEvent) {
        stage.update();
    }

    window.easyGameOver = easyGameOver;

}());


//same as easy game over.
(function () {

    function normalGameOver() { this.initialize(); }

    var p = normalGameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        stage.removeAllChildren();

        this.Container_initialize();
        this.addBackground();
        this.addText();
        this.addButtons();
    }

    p.addBackground = function () {
        var image = queue.getResult("game_over");
        var bitmap = new createjs.Bitmap(image);
        bitmap.scaleX = 0.75; bitmap.scaleY = 0.84;
        this.addChild(bitmap);
    }

    p.addText = function () {
        textboard = new createjs.Text("You Lose", "72px Arial", "black");
        textboard.x = 530; textboard.y = 100;
        this.addChild(textboard);
    }

    p.addButtons = function () {
        var btn = new ui.SimpleButton('Play Again');
        var btn2 = new ui.SimpleButton('    Menu    ');

        btn.setFontSize(42);
        btn.setUpColor('#A9BBC9');
        btn.on('click', this.playAgain, this);

        btn2.setFontSize(42);
        btn2.setUpColor('#A9BBC9');
        btn2.on('click', this.Menu, this);

        btn.x = 360; btn2.x = 820;
        btn.y = btn2.y = 650;

        this.addChild(btn, btn2);
    }

    p.playAgain = function (e) {
        this.dispatchEvent(GameStateEvents.NORMAL_GAME);
    }

    p.Menu = function (e) {
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }

    p.run = function (tickEvent) {
        stage.update();
    }

    window.normalGameOver = normalGameOver;

}());


//same as easy and normal game over.
(function () {

    function hardGameOver() { this.initialize(); }

    var p = hardGameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        stage.removeAllChildren();

        this.Container_initialize();
        this.addBackground();
        this.addText();
        this.addButtons();
    }

    p.addBackground = function () {
        var image = queue.getResult("game_over");
        var bitmap = new createjs.Bitmap(image);
        bitmap.scaleX = 0.75; bitmap.scaleY = 0.84;
        this.addChild(bitmap);
    }

    p.addText = function () {
        textboard = new createjs.Text("You Lose", "72px Arial", "black");
        textboard.x = 530; textboard.y = 100;
        this.addChild(textboard);
    }

    p.addButtons = function () {
        var btn = new ui.SimpleButton('Play Again');
        var btn2 = new ui.SimpleButton('    Menu    ');

        btn.setFontSize(42);
        btn.setUpColor('#A9BBC9');
        btn.on('click', this.playAgain, this);

        btn2.setFontSize(42);
        btn2.setUpColor('#A9BBC9');
        btn2.on('click', this.Menu, this);

        btn.x = 360; btn2.x = 820;
        btn.y = btn2.y = 650;

        this.addChild(btn, btn2);
    }

    p.playAgain = function (e) {
        this.dispatchEvent(GameStateEvents.HARD_GAME);
    }

    p.Menu = function (e) {
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }

    p.run = function (tickEvent) {
        stage.update();
    }

    window.hardGameOver = hardGameOver;

}());


