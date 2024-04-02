

function Flag(x, y) //TODO
{
	var flag = new Texture("Textures/Levels/Texture_Level.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 8, flag);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [576, 96, 32, 32]);
	this.sprite.addKeyframe(0, [608, 96, 32, 32]);
	this.sprite.addKeyframe(0, [640, 96, 32, 32]);
	this.sprite.addKeyframe(0, [672, 96, 32, 32]);
	this.sprite.addKeyframe(0, [704, 96, 32, 32]);
	this.sprite.addKeyframe(0, [736, 96, 32, 32]);
	this.sprite.addKeyframe(0, [768, 96, 32, 32]);
	this.sprite.addKeyframe(0, [800, 96, 32, 32]);
	this.sprite.addKeyframe(0, [832, 96, 32, 32]);
	// Set initial animation
	this.sprite.setAnimation(0);
}


Flag.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Flag.prototype.draw = function draw()
{
	this.sprite.draw();
}

Flag.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x, this.sprite.y-700, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height+650);
	
	return box;
}
 



