//Hung Dao 3/30/18
(function () {

    //create game menu.
    function GameMenu() { this.initialize(); }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addText();
        this.addButtons();
    }

    //add bitmap as background
    p.addBackground = function () {
        var image = queue.getResult("menu_background");
        var bitmap = new createjs.Bitmap(image);
        bitmap.scaleX = 0.3; bitmap.scaleY = 0.3;
        this.addChild(bitmap);
    }

    p.addText = function () {
        textboard = new createjs.Text("Naval Warfare", "72px Arial", "black");
        textboard.x = 500; textboard.y = 30;
        this.addChild(textboard);
    }

    //add simple button class object.
    p.addButtons = function () {
        var btn = new ui.SimpleButton('  Easy  ');
        var btn2 = new ui.SimpleButton('Normal');
        var btn3 = new ui.SimpleButton('  Hard  ');

        btn.setFontSize(42);
        btn.setUpColor('#A9BBC9');
        btn.on('click', this.playEasyMode, this);

        btn2.setFontSize(42);
        btn2.setUpColor('#A9BBC9');
        btn2.on('click', this.PlayNormalMode, this);

        btn3.setFontSize(42);
        btn3.setUpColor('#A9BBC9');
        btn3.on('click', this.PlayHardlMode, this);

        btn.x = btn2.x = btn3.x = 640;
        btn.y = 250; btn2.y = btn.y + btn.height + 50;
        btn3.y = btn2.y + btn2.height + 50;
        this.addChild(btn, btn2, btn3);
    }

    //dispatch different events by click buttons to change game states.
    p.playEasyMode = function (e) {
        this.dispatchEvent(GameStateEvents.EASY_GAME);
    }

    p.PlayNormalMode = function (e) {
        this.dispatchEvent(GameStateEvents.NORMAL_GAME);
    }

    p.PlayHardlMode = function (e) {
        this.dispatchEvent(GameStateEvents.HARD_GAME);
    }

    p.run = function (tickEvent) {
        stage.update();
    }

    window.GameMenu = GameMenu;

}());
