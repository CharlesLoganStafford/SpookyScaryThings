/**
 * Added a comment.
 */

var AM = new AssetManager();

/** Queueing download of all sound assets. */
AM.addMusic("./sound/bgmusic.mp3");
AM.addMusic("./sound/pop.mp3");

AM.queueDownload("./img/background.png");
AM.queueDownload("./img/idle.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();    
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));  
    
    for (i = 0; i < 10; i++) {
		gameEngine.addEntity(new Ghost(gameEngine, AM.getAsset("./img/idle.png"), randomIntFromRange(88.5, canvas.width - 88.5), 
				randomIntFromRange(0, canvas.height - 81.75), randomIntFromRange(-3, 3), randomIntFromRange(-2, 2)));
    }
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/bgmusic.mp3");
    theme.loop = true;
    theme.play();
    
    console.log("All Done!");        
});