/**
 * The "main" Javascript file of my animated webpage project.
 * Includes a game engine originally created by Seth Ladd, and edited for use by Christopher Marriott.
 * 
 * Author: Logan Stafford
 * Date: Feb 2018
 */

/** Initializing asset manager for use.*/
var AM = new AssetManager();

/** Queueing download of all sound assets. */
AM.addMusic("./media/bgmusic.mp3");

/** Queueing download of all art assets. */
AM.queueDownload("./media/background.png");
AM.queueDownload("./media/idle.png");

/** The main executable portion of the file. */
AM.downloadAll(function () {
	
	/** Setting canvas and context settings.*/
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	  ctx.fillStyle = "white";

	/** Initializing game engine for use.  */
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();    
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./media/background.png")));  
    
    /** Adding 5 ghosts onto the webpage, all on random areas of the canvas. */
    for (i = 0; i < 5; i++) {
		    gameEngine.addEntity(new Ghost(gameEngine, AM.getAsset("./media/idle.png"), randomIntFromRange(88.5, canvas.width - 88.5), randomIntFromRange(0, canvas.height - 81.75)));		
    }
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./media/bgmusic.mp3");
    theme.loop = true;
    theme.play();
});