
(function () {

    //set game states.
    var GameStates = {
        MAIN_MENU: 0,
        RUN_SCENE: 1,
        EASY_GAME: 2,
        NORMAL_GAME: 3,
        HARD_GAME: 4,
        EASY_GAME_OVER: 5,
        NORMAL_GAME_OVER: 6,
        HARD_GAME_OVER: 7,
        GAME_WINNING: 8
    }

    //set event for listeners.
    var GameStateEvents = {
        MAIN_MENU: 'main-menu-event',
        EASY_GAME: 'easy-game-event',
        NORMAL_GAME: 'normal-game-event',
        HARD_GAME: 'hard-game-event',
        GAME_WINNING: 'game-winning-event',
        EASY_GAME_OVER: 'easy-game-over-event',
        NORMAL_GAME_OVER: 'normal-game-over-event',
        HARD_GAME_OVER: 'hard-game-over-event'
    }

    window.GameStates = GameStates;
    window.GameStateEvents = GameStateEvents;
}()); 


(function () {
    //when start the game, go menu.
    function GameRunning() { this.initialize(); }

    var p = GameRunning.prototype;

    p.initialize = function () {
        stage = new createjs.Stage("canvas");
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.update, this);
        this.changeState(GameStates.MAIN_MENU);
    } 

    //get current game state and run scene.
    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case GameStates.MAIN_MENU: this.currentGameStateFunction = this.gameStateMainMenu; break;
            case GameStates.EASY_GAME: this.currentGameStateFunction = this.gameStateEasyGame; break; 
            case GameStates.NORMAL_GAME: this.currentGameStateFunction = this.gameStateNormalGame; break; 
            case GameStates.HARD_GAME: this.currentGameStateFunction = this.gameStateHardGame; break; 
            case GameStates.GAME_WINNING: this.currentGameStateFunction = this.gameStateEasyGameWinning; break; 
            case GameStates.EASY_GAME_OVER: this.currentGameStateFunction = this.gameStateEasyGameOver; break; 
            case GameStates.NORMAL_GAME_OVER: this.currentGameStateFunction = this.gameStateNormalGameOver; break; 
            case GameStates.HARD_GAME_OVER: this.currentGameStateFunction = this.gameStateHardGameOver; break; 
            case GameStates.RUN_SCENE: this.currentGameStateFunction = this.gameStateRunScene; break; 
        }
    }

    //change game state
    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    } 

    //menu
    p.gameStateMainMenu = function () {
        var menu = new GameMenu();
        menu.on(GameStateEvents.EASY_GAME, this.onStateEvent, this, false, { state: GameStates.EASY_GAME });
        menu.on(GameStateEvents.NORMAL_GAME, this.onStateEvent, this, false, { state: GameStates.NORMAL_GAME });
        menu.on(GameStateEvents.HARD_GAME, this.onStateEvent, this, false, { state: GameStates.HARD_GAME });
        stage.addChild(menu);
        stage.removeChild(this.currentScene);
        this.currentScene = menu;
        this.changeState(GameStates.RUN_SCENE); 
    } 

    //easy mode
    p.gameStateEasyGame = function () {
        var easyGame = new PlayEasyMode();
        easyGame.on(GameStateEvents.GAME_WINNING, this.onStateEvent, this, false, { state: GameStates.GAME_WINNING });
        easyGame.on(GameStateEvents.EASY_GAME_OVER, this.onStateEvent, this, false, { state: GameStates.EASY_GAME_OVER });
        stage.addChild(easyGame);
        stage.removeChild(this.currentScene);
        this.currentScene = easyGame;
        this.changeState(GameStates.RUN_SCENE); 
    } 

    //normal mode
    p.gameStateNormalGame = function () {
        var normalGame = new PlayNormalMode();
        normalGame.on(GameStateEvents.GAME_WINNING, this.onStateEvent, this, false, { state: GameStates.GAME_WINNING });
        normalGame.on(GameStateEvents.NORMAL_GAME_OVER, this.onStateEvent, this, false, { state: GameStates.NORMAL_GAME_OVER });
        stage.addChild(normalGame);
        stage.removeChild(this.currentScene);
        this.currentScene = normalGame;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //hard mode
    p.gameStateHardGame = function () {
        var hardGame = new PlayHardlMode();
        hardGame.on(GameStateEvents.GAME_WINNING, this.onStateEvent, this, false, { state: GameStates.GAME_WINNING });
        hardGame.on(GameStateEvents.HARD_GAME_OVER, this.onStateEvent, this, false, { state: GameStates.HARD_GAME_OVER });
        stage.addChild(hardGame);
        stage.removeChild(this.currentScene);
        this.currentScene = hardGame;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //game winning
    p.gameStateEasyGameWinning = function () {
        var game_Winning = new gameWinning();
        game_Winning.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: GameStates.MAIN_MENU });
        stage.addChild(game_Winning);
        stage.removeChild(this.currentScene);
        this.currentScene = game_Winning;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //game over after played easy mode
    p.gameStateEasyGameOver = function () {
        var gameOver = new easyGameOver();
        gameOver.on(GameStateEvents.EASY_GAME, this.onStateEvent, this, false, { state: GameStates.EASY_GAME });
        gameOver.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: GameStates.MAIN_MENU }); 
        stage.addChild(gameOver);
        stage.removeChild(this.currentScene);
        this.currentScene = gameOver;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //game over after played normal mode
    p.gameStateNormalGameOver = function () {
        var gameOver = new normalGameOver();
        gameOver.on(GameStateEvents.NORMAL_GAME, this.onStateEvent, this, false, { state: GameStates.NORMAL_GAME });
        gameOver.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: GameStates.MAIN_MENU }); 
        stage.addChild(gameOver);
        stage.removeChild(this.currentScene);
        this.currentScene = gameOver;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //game over after played hard mode
    p.gameStateHardGameOver = function () {
        var gameOver = new hardGameOver();
        gameOver.on(GameStateEvents.HARD_GAME, this.onStateEvent, this, false, { state: GameStates.HARD_GAME });
        gameOver.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: GameStates.MAIN_MENU }); 
        stage.addChild(gameOver);
        stage.removeChild(this.currentScene);
        this.currentScene = gameOver;
        this.changeState(GameStates.RUN_SCENE);
    } 

    //run state scene
    p.gameStateRunScene = function (tickEvent) {
        if (this.currentScene.run) {
            this.currentScene.run(tickEvent);
        }
    } 

    //checking current states.
    p.update = function (e) {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction(e);
        }
        stage.update(); 
    }

    window.GameRunning = GameRunning;

}());