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
AM.addMusic("./sound/bgmusic.mp3");

/** Queueing download of all art assets. */
AM.queueDownload("./img/background.png");
AM.queueDownload("./img/idle.png");

/** The main executable portion of the file. */
AM.downloadAll(function () {
	
	/** Setting canvas and context settings.*/
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";
	
	var playButton = document.getElementById("play");
	var pauseButton = document.getElementById("pause");
	var loadButton = document.getElementById("load");
	var saveButton = document.getElementById("save");	

	/** Initializing game engine for use.  */
    var gameEngine = new GameEngine();
    gameEngine.init(ctx, playButton, pauseButton, loadButton, saveButton);
    gameEngine.start();    
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));  
    
    /** Adding 15  ghosts onto the webpage, all on random areas of the canvas. */
    for (i = 0; i < 10; i++) {
		var ghost = new Ghost(gameEngine, AM.getAsset("./img/idle.png"), randomIntFromRange(88.5, canvas.width - 88.5), 
				randomIntFromRange(0, canvas.height - 81.75));
		gameEngine.addEntity(ghost);
		gameEngine.heads.push(ghost);
    }
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/bgmusic.mp3");
    theme.loop = true;
    theme.play();   
    
    saveButton.addEventListener("click", function (e) {
		gameEngine.setHeads(gameEngine.heads);
		gameEngine.saveGame();
    }, false);
	
	gameEngine.socket.on("load", function(e) {
		console.log(e.state);
		for (var i = 0; i < 10; i++) {
			this.entities[i].x = e.state.heads[i].x;
			this.entities[i].y = e.state.heads[i].y;
			this.entities[i].velocity.x = e.state.heads[i].velocity.x;
			this.entities[i].velocity.y = e.state.heads[i].velocity.y;
		}
		gameEngine.setHeads(heads);
	});
});