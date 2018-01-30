/**
 * Added a comment.
 */

var AM = new AssetManager();

AM.queueDownload("./img/background.png");
AM.queueDownload("./img/idle.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));   
    gameEngine.addEntity(new Ghost(gameEngine, AM.getAsset("./img/idle.png")));
    
    console.log("All Done!");        
});