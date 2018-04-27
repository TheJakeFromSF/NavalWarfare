
(function () {
    window.ui = window.ui || {};
    var SimpleButton = function (label) { this.label = label; this.initialize(); }
    var p = SimpleButton.prototype = new createjs.Container();
    p.label;
    p.Container_initialize = p.initialize;
    p.initialize = function () { this.Container_initialize(); }

    p.initialize = function () {
        this.Container_initialize();
        this.drawButton();
        this.setButtonListeners();
    }

    p.drawButton = function () {
        this.removeAllChildren();
        this.labelTxt = new createjs.Text(this.label, this.fontSize + 'px Arial', this.color);
        this.labelTxt.textAlign = 'center';
        this.labelTxt.textBaseline = 'top';
        this.width = this.labelTxt.getMeasuredWidth() + 30;
        this.height = this.labelTxt.getMeasuredHeight() + 20;
        this.labelTxt.x = this.width / 2;
        this.labelTxt.y = 10;
        this.background = new createjs.Shape();
        this.background.graphics.beginStroke(this.borderColor).beginFill(this.buttonColor).drawRect(0, 0, this.width, this.height);
        this.addChild(this.background, this.labelTxt);
    }

    p.setButtonListeners = function () {
        this.cursor = 'pointer';
        //this.on('rollover', this.onButtonOver);
        //this.on('rollout', this.onButtonOut);
        //this.on('click', this.setGameState);
    }

    //p.onButtonOver = function () {
    //    this.buttonColor = this.overColor;
    //    this.drawButton();
    //}

    //p.onButtonOut = function () {
    //    this.buttonColor = this.upColor;
    //    this.drawButton();
    //} 

    p.setUpColor = function (color) {
        this.upColor = color;
        this.buttonColor = color;
        this.drawButton();
    }

    p.setOverColor = function (color) {
        this.overColor = color;
    }

    p.setColor = function (color) {
        this.color = this.labelTxt.color = color;
    }

    p.setFontSize = function (size) {
        this.fontSize = size;
        this.drawButton();
    } 

    window.ui.SimpleButton = SimpleButton;
}()); 



