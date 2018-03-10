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
    gameEngine.init(ctx);
    gameEngine.start();    
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));  
    
    /** Adding 15  ghosts onto the webpage, all on random areas of the canvas. */
    for (i = 0; i < 10; i++) {
		gameEngine.addEntity(new Ghost(gameEngine, AM.getAsset("./img/idle.png"), randomIntFromRange(88.5, canvas.width - 88.5), 
				randomIntFromRange(0, canvas.height - 81.75)));
    }
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/bgmusic.mp3");
    theme.loop = true;
    theme.play();   
    
    saveButton.addEventListener("click", function (e) {
		gameEngine.setSquares(squares);
		gameEngine.saveGame();
    }, false);
	
	gameEngine.socket.on("load", function(e) {
		console.log(e.state);
		for (var i = 0; i < 62; i++) {
			for (var j = 0; j < 82; j++) {
				squares[i][j].level = e.state[i][j];
			}
		}
		gameEngine.setSquares(squares);
	});
});