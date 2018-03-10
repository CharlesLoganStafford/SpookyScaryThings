window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.isPaused = true;
	this.play = null;
	this.pause = null;
	this.load = null;
	this.save = null;
	this.heads = [];
}

GameEngine.prototype.init = function (ctx, play, pause, load, save) {
	
	this.socket = io.connect("http://24.16.255.56:8888");
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    console.log('game initialized');
    this.play = play;
	this.pause = pause;
	this.load = load;
	this.save = save;
	this.startInput();
	this.socket.on("connect", function () {
		console.log("Socket connected.")
	});
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
}

GameEngine.prototype.loop = function () {
    if (!this.isPaused) {
    	this.clockTick = this.timer.tick();
    	this.update();
        this.draw();
    }
}

GameEngine.prototype.pauseGame = function() {
	console.log("pausing game");
	this.isPaused = true;
}

GameEngine.prototype.resumeGame = function() {
	console.log("resuming game");
	this.isPaused = false;
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');

    var that = this;

    // event listeners are added here

	this.play.addEventListener("click", function (e) {
		that.resumeGame();
    }, false);
	
	this.pause.addEventListener("click", function (e) {
		that.pauseGame();
    }, false);
	
	this.load.addEventListener("click", function (e) {
		that.socket.emit('load', { studentname: "Logan Stafford", statename: "save"});
    }, false);
	

    console.log('Input started');
}

GameEngine.prototype.setHeads = function(heads) {
	this.heads = [];
	for (var i = 0; i < 10; i++) {
		this.heads.push(this.entities[i]);

	}
	this.draw();
}

GameEngine.prototype.saveGame = function() {
	this.socket.emit('save', { studentname: "Logan Stafford", statename: "save", state: this.heads });
}