
//frigate as container.
function Frigate() {
    var image = queue.getResult("frigate");

    var bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = 0.4; bitmap.scaleY = 0.4;
    bitmap.regX = 312; bitmap.regY = 187;

    var FF = new createjs.Container();
    FF.addChild(bitmap);
    FF.x = 720; FF.y = 700;

    var FrigateHPBarBG = new HPBarBG();
    FF.addChild(FrigateHPBarBG);
    stage.addChild(FrigateHPBarBG);

    var FrigateHPBar = new HPBar();
    FF.addChild(FrigateHPBar);
    stage.addChild(FrigateHPBar);

    var cannonPositions = [
        [50, 20],
        [40, 23],
        [30, 26],
        [20, 28],
        [10, 28],
        [0, 28],
        [-10, 28],
        [-20, 28],
        [-30, 28],
        [-40, 26],
        [-50, 23],
        [-60, 20],
        [-70, 18]
    ];

    FF.cannonPositions = cannonPositions;
    FF.HP = 40;
    FF.speed = 1.5;

    FF.turnLeft = false;
    FF.turnRight = false;
    FF.forward = false;
    FF.fireLCannons = false;
    FF.fireRCannons = false;
    FF.loaded = false;

    //set controls of player's ship
    FF.update = function () {
        if (this.turnLeft && this.forward) {
            this.rotation -= 0.8;
            this.moveForward();
        }
        else if (this.turnRight && this.forward) {
            this.rotation += 0.8;
            this.moveForward();
        }
        else if (this.turnLeft) {
            this.rotation -= 0.8;
        }
        else if (this.turnRight) {
            this.rotation += 0.8;
        }
        else if (this.forward) {
            this.moveForward();
        }

        FrigateHPBarBG.update(this.x - 70, this.y + 50);
        FrigateHPBar.update(this.x - 70, this.y + 50, this.HP);
    };

    //moving
    FF.moveForward = function () {
        var nextX = this.x;
        var nextY = this.y;

        nextX += (this.speed * Math.cos(this.rotation * Math.PI / 180));
        nextY += (this.speed * Math.sin(this.rotation * Math.PI / 180));

        if (nextX < 0 || nextX > 1440) {
            nextX = this.x;
        }

        if (nextY < 0 || nextY > 900) {
            nextY = this.y;
        }

        this.x = nextX;
        this.y = nextY;
    }

    return FF;
}