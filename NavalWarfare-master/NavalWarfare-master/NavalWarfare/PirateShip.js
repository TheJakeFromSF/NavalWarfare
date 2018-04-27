
//pirateship as container.
function PirateShip() {
    var image = queue.getResult("pirateship");

    var AIStartLoad = new Date().getTime();

    var bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = 0.15; bitmap.scaleY = 0.15;
    bitmap.regX = 719; bitmap.regY = 318;

    var PS = new createjs.Container();
    PS.addChild(bitmap);

    var PirateShipHPBarBG = new HPBarBG();
    PS.addChild(PirateShipHPBarBG);
    stage.addChild(PirateShipHPBarBG);

    var PirateShipHPBar = new HPBar();
    PS.addChild(PirateShipHPBar);
    stage.addChild(PirateShipHPBar);

    var cannonPositions = [
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

    PS.cannonPositions = cannonPositions;
    PS.HP = 40;
    PS.speed = 1.8;
    PS.startLoad = AIStartLoad;

    //update the position
    PS.update = function () {
        nextX = this.x + (this.speed * Math.cos(this.rotation * Math.PI / 180));
        nextY = this.y + (this.speed * Math.sin(this.rotation * Math.PI / 180));

        if (nextX < 0 || nextX > 1440) {
            nextX = this.x;
        }

        if (nextY < 0 || nextY > 900) {
            nextY = this.y;
        }

        this.x = nextX;
        this.y = nextY;

        PirateShipHPBarBG.update(this.x - 70, this.y + 50);
        PirateShipHPBar.update(this.x - 70, this.y + 50, this.HP);
    }

    return PS;
}