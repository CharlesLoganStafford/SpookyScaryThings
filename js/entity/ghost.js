function Ghost(game, spritesheets) 
{
	// the sprite coordinate must be modified
	this.animation = new Animation(spritesheets, 163.5, 177, 2, 0.25, 2, true, 1);
    this.x = 0;
    this.y = 0;
	this.speed = 5;
	this.ctx = game.ctx;
	Entity.call(this, game, 300, 200);
}

Ghost.prototype = new Entity();
Ghost.prototype.constructor = Ghost;

Ghost.prototype.update = function() 
{	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Ghost.prototype.draw = function() 
{
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}