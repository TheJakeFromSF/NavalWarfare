
(function () {

    function setControls() {
        // key codes
        const ARROW_KEY_LEFT = 37;
        const ARROW_KEY_UP = 38;
        const ARROW_KEY_RIGHT = 39;
        const F_KEY = 70;
        const R_KEY = 82;
        const SPACE_KEY = 32;

        //checking key events
        function handleKeyDown(e) {
            switch (e.keyCode) {
                case ARROW_KEY_LEFT: frigate.turnLeft = true; break;
                case ARROW_KEY_UP: frigate.forward = true; break;
                case ARROW_KEY_RIGHT: frigate.turnRight = true; break;
                case F_KEY: frigate.fireLCannons = true; launchCannons(); break;
                case R_KEY: frigate.fireRCannons = true; launchCannons(); break;
                case SPACE_KEY: pauseAndResume(); break;
            }
        }
        //checking key events
        function handleKeyUp(e) {
            switch (e.keyCode) {
                case ARROW_KEY_LEFT: frigate.turnLeft = false; break;
                case ARROW_KEY_UP: frigate.forward = false; break;
                case ARROW_KEY_RIGHT: frigate.turnRight = false; break;
                case F_KEY: frigate.fireLCannons = false; break;
                case R_KEY: frigate.fireRCannons = false; break;
            }
        }
        window.onkeydown = handleKeyDown;
        window.onkeyup = handleKeyUp;

        //using ticker to pause or resume game
        function pauseAndResume() {
            if (createjs.Ticker.getPaused()) {
                createjs.Ticker.setPaused(false);
            }
            else {
                createjs.Ticker.setPaused(true);
            }
        }
    }

    window.setControls = setControls;

    //launch player's ship's cannons
    function launchCannons() {
        var ball;
        const angle = frigate.rotation;

        if (frigate.loaded) {
            if (frigate.fireLCannons) {
                var i;
                for (i = 0; i < frigate.cannonPositions.length; i++) {
                    ball = new cannonball(angle, "left", "frigate");
                    ball.x = (frigate.cannonPositions[i][0] * Math.cos(ball.shootangle * Math.PI / 180)) - (-frigate.cannonPositions[i][1] * Math.sin(ball.shootangle * Math.PI / 180)) + frigate.x;
                    ball.y = (frigate.cannonPositions[i][0] * Math.sin(ball.shootangle * Math.PI / 180)) + (-frigate.cannonPositions[i][1] * Math.cos(ball.shootangle * Math.PI / 180)) + frigate.y;
                    startLoadCannon = new Date().getTime();
                    cannonballs.push(ball);

                    muzzleFlash(ball.x, ball.y);

                    stage.addChild(ball);
                }
                cannonEffect();
            }
            else if (frigate.fireRCannons) {
                var i;
                for (i = 0; i < frigate.cannonPositions.length; i++) {
                    ball = new cannonball(angle, "right", "frigate");
                    ball.x = -(frigate.cannonPositions[i][0] * Math.cos(ball.shootangle * Math.PI / 180)) - (frigate.cannonPositions[i][1] * Math.sin(ball.shootangle * Math.PI / 180)) + frigate.x;
                    ball.y = -(frigate.cannonPositions[i][0] * Math.sin(ball.shootangle * Math.PI / 180)) + (frigate.cannonPositions[i][1] * Math.cos(ball.shootangle * Math.PI / 180)) + frigate.y;
                    startLoadCannon = new Date().getTime();
                    cannonballs.push(ball);

                    muzzleFlash(ball.x, ball.y);

                    stage.addChild(ball);
                }
                cannonEffect();
            }
        }
    }

    //display effects when cannonball hits something. also reduce target HP.
    function hit(x, y, ball, target) {
        target.HP -= ball.damage;

        var s1 = new createjs.Shape();
        s1.graphics.beginStroke("grey").beginFill("yellow").drawPolyStar(0, 0, 20, 5, 0.8);
        s1.x = x; s1.y = y;
        s1.alpha = 0.7;

        var s2 = new createjs.Shape();
        s2.graphics.beginStroke("grey").beginFill("yellow").drawPolyStar(0, 0, 15, 7, 0.6);
        s2.x = x; s2.y = y;
        s2.alpha = 0.8;

        var s3 = new createjs.Shape();
        s3.graphics.beginFill("grey").drawPolyStar(0, 0, 25, 9, 0.5);
        s3.x = x; s3.y = y;
        s3.alpha = 0.7;

        stage.addChild(s3, s1, s2);
        hitEffect();

        stage.removeChild(ball);
        cannonballs.splice(cannonballs.indexOf(ball), 1);

        var time = new Date().getTime();

        createjs.Ticker.addEventListener("tick", smoking);

        function smoking(e) {
            var smokingtime = new Date().getTime();
            if (smokingtime - time < 2000) {
                s1.alpha -= 0.01; s2.alpha -= 0.01; s3.alpha -= 0.01;
            }
            else {
                stage.removeChild(s3, s1, s2);
                createjs.Ticker.removeEventListener("tick", smoking);
            }
        }
    }

    //add muzzle flash
    function muzzleFlash(x, y) {
        var s1 = new createjs.Shape();
        s1.graphics.beginFill("grey").drawCircle(0, 0, 10);
        s1.x = x; s1.y = y - 5;
        s1.alpha = 0.7;

        stage.addChild(s1);
        createjs.Ticker.addEventListener("tick", muzzleEffect);
        var time = new Date().getTime();

        function muzzleEffect(e) {
            var effectTime = new Date().getTime();
            if (effectTime - time < 2000) {
                s1.alpha -= 0.02;
            }
            else {
                createjs.Ticker.removeEventListener("tick", muzzleEffect);
                stage.removeChild(s1);
            }
        }
    }

    //add sound effect
    function cannonEffect() {
        audio = new Audio('Assets/muzzle_sound.mp3');
        audio.play();
    }

    //in functuion hit() in GameEvents.js
    function hitEffect() {
        audio = new Audio('Assets/explosion.mp3');
        audio.play();
    }

    window.launchCannons = launchCannons;
    window.hit = hit;
    window.muzzleFlash = muzzleFlash;
    window.cannonEffect = cannonEffect;
    window.hitEffect = window.hitEffect;
}());
