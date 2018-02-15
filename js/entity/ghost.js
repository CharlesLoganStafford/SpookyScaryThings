/**
 * The "Ghost" Javascript file of my animated webpage project. This represents a Ghost entity.
 * Includes a game engine originally created by Seth Ladd, and edited for use by Christopher Marriott.
 * 
 * Author: Logan Stafford
 * Date: Feb 2018
 */
function Ghost(game, spritesheets, x, y, dx, dy) {
	this.animation = new Animation(spritesheets, 163.5, 177, 2, 0.25, 2, true, .4);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
	this.ctx = game.ctx;
	this.grav = 0.1;
	this.fric = 0.9;
	Entity.call(this, game, x, y);
}

Ghost.prototype = new Entity();
Ghost.prototype.constructor = Ghost;

Ghost.prototype.update = function() {	
	/** Adjusting entity collision bounds. */
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity)) {
			this.dy = -this.dy * this.fric;
			this.dx = -this.dx * this.fric;
		}
	}
	
	/** Adjusting "wall" collision bounds for the y-coordinate. */
	if (this.y + this.dy + 72 > 768) {
		this.dy = -this.dy * this.fric;
	} else {
		this.dy += this.grav;
	}
	
	/** Adjusting "wall" collision bounds for the x-coordinate. */
	if (this.x + 72 >= 1024 || this.x <= 0) {
		this.dx = -this.dx * this.fric;
	}
	
	this.x += this.dx;
	this.y += this.dy;
	
	Entity.prototype.update.call(this);
}

Ghost.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Ghost.prototype.collide = function(other) {
	return distance(this, other) < 60;
}