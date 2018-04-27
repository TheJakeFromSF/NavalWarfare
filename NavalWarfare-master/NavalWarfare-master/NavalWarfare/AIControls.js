
//set AI control functions
function UpdateAI() {

    const AIcombatRange = 600;
    const shootingAngle = 0.5;

    var xDistance;
    var yDistance;
    var xDistanceAbs;
    var yDistanceAbs;
    var distance;

    var shipAngle;
    var targetAngleSin;
    var targetAngle;
    var angleTest;

    var leftBoardside = "left";
    var rightBoardside = "right";

    var i;
    for (i = 0; i < allPirateShips.length; i++) {
        xDistance = frigate.x - allPirateShips[i].x;
        yDistance = allPirateShips[i].y - frigate.y;
        xDistanceAbs = Math.abs(xDistance);
        yDistanceAbs = Math.abs(yDistance);
        distance = Math.sqrt((xDistanceAbs * xDistanceAbs) + (yDistanceAbs * yDistanceAbs));

        targetAngleSin = (xDistanceAbs / Math.sqrt((xDistanceAbs * xDistanceAbs) + (yDistanceAbs * yDistanceAbs))) * (180 / Math.PI);
        targetAngle = targetAngleSin;
        shipAngle = allPirateShips[i].rotation % 360;
        while (shipAngle < 0) {
            shipAngle = 360 + shipAngle;
        }

        if (xDistance >= 0 && yDistance > 0) {
            targetAngleSin = 270 + targetAngleSin;
        }
        else if (xDistance < 0 && yDistance >= 0) {
            targetAngleSin = 270 - targetAngleSin;
        }
        else if (xDistance < 0 && yDistance <= 0) {
            targetAngleSin = 90 + targetAngleSin;
        }
        else if (xDistance >= 0 && yDistance < 0) {
            targetAngleSin = 90 - targetAngleSin;
        }

        if (distance >= AIcombatRange) {
            turning(shipAngle, targetAngleSin);
            checkAimed();
        }
        else if (distance < AIcombatRange) {
            checkAimed();

            if (Math.abs(shipAngle - targetAngle) < 180) {
                if (shipAngle < targetAngle) {
                    allPirateShips[i].rotation -= 1;
                }
                else {
                    allPirateShips[i].rotation += 1;
                }
            }
            else {
                if (shipAngle < targetAngle) {
                    allPirateShips[i].rotation += 1;
                }
                else {
                    allPirateShips[i].rotation -= 1;
                }
            }
        }
    }

    function turning(shipHeading, targetBearing) {
        if (Math.abs(targetBearing - shipHeading) < 180) {
            if (shipHeading < targetBearing) {
                allPirateShips[i].rotation += 1;
            }
            else {
                allPirateShips[i].rotation -= 1;
            }
        }
        else if (Math.abs(targetBearing - shipHeading) > 180) {
            if (shipHeading < targetBearing) {
                allPirateShips[i].rotation -= 1;
            }
            else {
                allPirateShips[i].rotation += 1;
            }
        }
    }

    function checkAimed() {
        angleTest = Math.abs(90 - (shipAngle % 90) - targetAngle);

        if (shipAngle <= 90) {
            if (xDistance <= 0 && yDistance <= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], rightBoardside);
                }
            }
            else if (xDistance >= 0 && yDistance >= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], leftBoardside);
                }
            }
        }
        else if (shipAngle > 90 && shipAngle <= 180) {
            if (xDistance <= 0 && yDistance >= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], rightBoardside);
                }
            }
            else if (xDistance >= 0 && yDistance <= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], leftBoardside);
                }
            }
        }
        else if (shipAngle > 180 && shipAngle <= 270) {
            if (xDistance >= 0 && yDistance >= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], rightBoardside);
                }
            }
            else if (xDistance <= 0 && yDistance <= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], leftBoardside);
                }
            }
        }
        else if (shipAngle > 270) {
            if (xDistance >= 0 && yDistance <= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], rightBoardside);
                }
            }
            else if (xDistance <= 0 && yDistance >= 0) {
                if (angleTest < shootingAngle) {
                    fireCannon(allPirateShips[i], leftBoardside);
                }
            }
        }
    }
}

//AI launch their cannons
function fireCannon(ship, boardside) {
    var ball;
    const reload = 3000;
    var checkCannonLoaded = new Date().getTime();
    const angle = ship.rotation;

    if (loaded()) {
        var i;
        for (i = 0; i < ship.cannonPositions.length; i++) {
            if (boardside == "left") {
                ball = new cannonball(angle, "left", "pirates");
                ball.x = (ship.cannonPositions[i][0] * Math.cos(ball.shootangle * Math.PI / 180)) - (-ship.cannonPositions[i][1] * Math.sin(ball.shootangle * Math.PI / 180)) + ship.x;
                ball.y = (ship.cannonPositions[i][0] * Math.sin(ball.shootangle * Math.PI / 180)) + (-ship.cannonPositions[i][1] * Math.cos(ball.shootangle * Math.PI / 180)) + ship.y;
                cannonballs.push(ball);

                muzzleFlash(ball.x, ball.y);

                stage.addChild(ball);
            }
            else {
                ball = new cannonball(angle, "pirates");
                ball.x = -(ship.cannonPositions[i][0] * Math.cos(ball.shootangle * Math.PI / 180)) - (ship.cannonPositions[i][1] * Math.sin(ball.shootangle * Math.PI / 180)) + ship.x;
                ball.y = -(ship.cannonPositions[i][0] * Math.sin(ball.shootangle * Math.PI / 180)) + (ship.cannonPositions[i][1] * Math.cos(ball.shootangle * Math.PI / 180)) + ship.y;
                cannonballs.push(ball);

                muzzleFlash(ball.x, ball.y);

                stage.addChild(ball);
            }
        }
        cannonEffect();
    }

    function loaded() {
        var distance = checkCannonLoaded - ship.startLoad;
        if (distance > reload) {
            ship.startLoad = new Date().getTime();
            return true;
        }
        else {
            return false;
        }
    }
}

