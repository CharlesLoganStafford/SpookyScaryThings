/**
 * The "Ghost" Javascript file of my animated webpage project. This represents a Ghost entity.
 * Includes a game engine originally created by Seth Ladd, and edited for use by Christopher Marriott.
 * 
 * Author: Logan Stafford
 * Date: Feb 2018
 */
function Ghost(game, spritesheets, x, y) {
	this.animation = new Animation(spritesheets, 163.5, 177, 2, 0.25, 2, true, .4);
    this.x = x;
    this.y = y;
    this.velocity = {
    		x: (Math.random() - 0.5 * 5), 
    		y: (Math.random() - 0.5 * 5)
    };
    this.mass = 1;
    this.music = [];
	this.ctx = game.ctx;
	this.grav = 0.1;
	this.fric = 0.9;
	this.addMusic("./media/pop.mp3");
	Entity.call(this, game, x, y);
}

Ghost.prototype = new Entity();
Ghost.prototype.constructor = Ghost;

Ghost.prototype.update = function() {	
	/** Adjusting entity collision bounds. */
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity)) {
			resolveCollision(this, entity);
			this.getMusic('./media/pop.mp3').play();
		}
	}
	
	/** Adjusting "wall" collision bounds for the y-coordinate. */
	if (this.y + this.velocity.y + 72 > 768) {
		this.velocity.y = -this.velocity.y * this.fric;
		this.getMusic('./media/pop.mp3').play();
	} else {
		this.velocity.y += this.grav;
	}
	
	/** Adjusting "wall" collision bounds for the x-coordinate. */
	if (this.x + 72 >= 1024 || this.x <= 0) {
		this.velocity.x = -this.velocity.x * this.fric;
		this.getMusic('./media/pop.mp3').play();
	}
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
	Entity.prototype.update.call(this);
}

Ghost.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Ghost.prototype.collide = function(other) {
	return distance(this, other) < 60;
}

Ghost.prototype.addMusic = function(path) {
	var sound = new Audio();
	sound.addEventListener("canplay", null);
	sound.addEventListener("error", null);
	sound.src = path;
	this.music[path] = sound;
}

Ghost.prototype.getMusic = function(path) {
	return this.music[path];
}