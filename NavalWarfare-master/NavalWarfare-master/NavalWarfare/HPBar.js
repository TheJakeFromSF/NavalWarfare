
(function () {

    //draw background for HP bar.
    function HPBarBG() {
        this.initialize();
    }

    var p = HPBarBG.prototype = new createjs.Container();
    
    p.initialize = function () {
        var s = new createjs.Shape();
        s.graphics.beginStroke("white").beginFill("red").drawRect(0, 0, 100, 3);
        s.x = 0; s.y = 0;

        this.addChild(s);
    }

    p.update = function (x, y) {
        this.x = x; this.y = y;
    }

    window.HPBarBG = HPBarBG;
}());


(function () {

    //draw HP.
    function HPBar() {
        this.initialize();
    }

    var p = HPBar.prototype = new createjs.Container();

    p.initialize = function () {
        var s = new createjs.Shape();
        s.graphics.beginFill("green").drawRect(0, 0, 100, 3);
        s.x = 0; s.y = 0;

        this.addChild(s);
    }

    p.update = function (x, y, HP) {
        if (HP >= 0) {
            this.scaleX = (HP / 40);
        }
        this.x = x; this.y = y;
    }

    window.HPBar = HPBar;

}());