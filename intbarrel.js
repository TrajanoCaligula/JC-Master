

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

	
	this.animation = false;
	this.animationTime = 100;
	
	this.sound = AudioFX('Sounds/intBarrel.mp3');
}


Intbarrel.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	if(this.animation){
		this.animationTime -= deltaTime;
		if(this.animationTime <= 0){
			this.sprite.y = this.originalY;
			this.animation = false;
			this.animationTime = 200;
		}
	}
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
	this.originalY = this.sprite.y;
	this.animation = true;
	this.sprite.y -= 2;
	this.sound.play();
	this.Activated();
}


