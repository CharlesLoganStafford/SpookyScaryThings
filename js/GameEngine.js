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
    this.musicPlaying = false;
}

GameEngine.prototype.init = function (ctx) {	
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    /** Play the background music, continuously looping. */
    this.theme = AM.getMusic("./media/bgmusic.mp3");
    this.theme.loop = true;
    this.theme.play();
    this.musicPlaying = true;
    this.timer = new Timer();
    console.log('Game initialized.');
}

GameEngine.prototype.start = function () {
    console.log("Starting game engine...");
    var that = this;
    this.theme.play();
	
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();

    console.log("Game engine started.");
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
    	this.clockTick = this.timer.tick();
    	this.update();
        this.draw();
}