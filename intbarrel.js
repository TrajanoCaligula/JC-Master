

function Intbarrel(x, y)
{
	var barrel = new Texture("Textures/Levels/Barrel/Idle/Barrel.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 8, barrel);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 32, 32]);
	this.sprite.addKeyframe(0, [32, 0, 32, 32]);
	this.sprite.addKeyframe(0, [64, 0, 32, 32]);
	this.sprite.addKeyframe(0, [96, 0, 32, 32]);
	this.sprite.addKeyframe(0, [128, 0, 32, 32]);
	this.sprite.addKeyframe(0, [160, 0, 32, 32]);
	this.sprite.addKeyframe(0, [192, 0, 32, 32]);
	this.sprite.addKeyframe(0, [224, 0, 32, 32]);
	this.sprite.addKeyframe(0, [256, 0, 32, 32]);
	this.sprite.addKeyframe(0, [288, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(1, [32, 32, 32, 32]);

	this.beenActivated = false;
	this.originalY = this.sprite.y;

	
	this.sound = AudioFX('Sounds/intBarrel.mp3');
}


Intbarrel.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Intbarrel.prototype.draw = function draw()
{
	this.sprite.draw();
}

Intbarrel.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x+2, this.sprite.y+2, this.sprite.x + this.sprite.width-2, this.sprite.y + this.sprite.height-2);
	
	return box;
}
 Intbarrel.prototype.Activated = function(){
 	if(this.beenActivated == false){
 		this.sprite.setAnimation(1);
 		this.beenActivated = true;
 	}
 }

 Intbarrel.prototype.impact = function(){
	this.sprite.y -= 2;
	this.sound.play();
	setTimeout(() => {
	  this.sprite.y = this.originalY; // This will be printed after 2 seconds
	}, 200);
	this.Activated();
}


