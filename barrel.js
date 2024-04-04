function Barrel(x, y)
{
	var barrel = new Texture("Textures/Levels/Barrel/Idle/Barrel.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 0, barrel);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(1, [32, 32, 32, 32]);
	this.beenActivated = false;
	this.isShown = true;
	this.originalY = this.sprite.y;
	this.crack = AudioFX('Sounds/wood_crash.mp3');
}


Barrel.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Barrel.prototype.draw = function draw()
{
	this.sprite.draw();
}

Barrel.prototype.collisionBox = function()
{
	if(this.isShown) var box = new Box(this.sprite.x+2, this.sprite.y+2, this.sprite.x + this.sprite.width-2, this.sprite.y + this.sprite.height-2);
	else var box = new Box(0,0,0,0);
	return box;
}

Barrel.prototype.Activated = function(){
	if(this.beenActivated == false){
		this.sprite.setAnimation(1);
		this.beenActivated = true;
	}
}

Barrel.prototype.move = function(){
	this.sprite.y -= 2;
	setTimeout(() => {
	  this.sprite.y = this.originalY; // This will be printed after 2 seconds
	}, 100);
}
Barrel.prototype.crash = function(){
	this.crack.play();
}