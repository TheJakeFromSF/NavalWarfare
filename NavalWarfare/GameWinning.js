
//create the game winning scene.
(function () {

    function gameWinning() { this.initialize(); }

    var p = gameWinning.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        stage.removeAllChildren();

        this.Container_initialize();
        this.addBackground();
        this.addText();
        this.addButtons();
    }

    //backgroud image
    p.addBackground = function () {
        var image = queue.getResult("game_winning");
        var bitmap = new createjs.Bitmap(image);
        bitmap.scaleX = 1.1; bitmap.scaleY = 1.0;
        this.addChild(bitmap);
    }

    p.addText = function () {
        textboard = new createjs.Text("You Win", "72px Arial", "black");
        textboard.x = 580; textboard.y = 100;
        this.addChild(textboard);
    }

    //add simple button and set listener.
    p.addButtons = function () {
        var btn = new ui.SimpleButton('    Menu    ');

        btn.setFontSize(42);
        btn.setUpColor('#A9BBC9');
        btn.on('click', this.Menu, this);

        btn.x = 600; btn.y = 650;

        this.addChild(btn);
    }

    p.Menu = function (e) {
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }

    p.run = function (tickEvent) {
        stage.update();
    }

    window.gameWinning = gameWinning;

}()); 
