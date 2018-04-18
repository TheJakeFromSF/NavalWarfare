
(function () {

    //create cannonball as a container.
    function cannonball(shootangle, boardside, ship) {
        var g = new createjs.Graphics();
        g.beginFill("black").drawCircle(0, 0, 3);
        this.Shape_constructor(g);

        this.x = 0; this.y = 0;
        this.regX = 1.5; this.regY = 1.5;

        this.shootangle = shootangle;
        this.boardside = boardside;
        this.launchedFrom = ship;
    }

    var p = createjs.extend(cannonball, createjs.Shape);

    p.damage = 2;
    p.speed = 10;

    //update the trajectory of the cannonball.
    p.update = function () {
        var nextX = this.x;
        var nextY = this.y;

        if (this.boardside == "left") {
            nextX += (this.speed * Math.sin(this.shootangle * Math.PI / 180));
            nextY -= (this.speed * Math.cos(this.shootangle * Math.PI / 180));
        }
        else {
            nextX -= (this.speed * Math.sin(this.shootangle * Math.PI / 180));
            nextY += (this.speed * Math.cos(this.shootangle * Math.PI / 180));
        }

        var pt;
        if (this.launchedFrom == "frigate") {
            var i;
            for (i = 0; i < allPirateShips.length; i++) {
                pt = this.localToLocal(0, 0, allPirateShips[i]);
                if (allPirateShips[i].hitTest(pt.x, pt.y) === true) {
                    hit(nextX, nextY, this, allPirateShips[i]);
                }
            }
        }
        else {
            pt = this.localToLocal(0, 0, frigate);
            if (frigate.hitTest(pt.x, pt.y)) {
                hit(nextX, nextY, this, frigate);
            }
        }
        
        this.x = nextX;
        this.y = nextY;

        if (this.x < -1500 || this.x > 1500 || this.y < -1000 || this.y > 1000) {
            stage.removeChild(this);
            cannonballs.splice(cannonballs.indexOf(this), 1);
        }
    }

    window.cannonball = createjs.promote(cannonball, "Shape");

}());