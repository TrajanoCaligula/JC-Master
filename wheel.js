const WHEEL_BORN = 0;
const WHEEL_LEFT = 1;
const WHEEL_RIGHT = 2;

function Wheel(x, y, map)
{
	// Loading spritesheets
	var wheel = new Texture("Textures/Levels/Wheel.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 8, wheel);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_BORN, [0, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [32, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [64, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [96, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [128, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [160, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [192, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [224, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_BORN, [256, 0, 32, 32]);

	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_LEFT, [0, 32, 32, 32]); 
	this.sprite.addKeyframe(WHEEL_LEFT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [160, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_RIGHT, [160, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [0, 32, 32, 32]); 

	// Set initial animation
	this.sprite.setAnimation(WHEEL_BORN);

	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.jumpAngle = 0;
	this.isfalling = 0;
	this.direction = RIGHT;

	this.isBorn = false;
	this.Dead = false;
	this.bornTime = 900;	

	this.points = 300;
}

Wheel.prototype.update = function(deltaTime)
{
	if(this.Dead)return;
	else if(!this.isBorn){
		this.bornTime -= deltaTime;
		if(this.bornTime <= 0) {
			this.isBorn = true;
			if(this.direction == LEFT) this.sprite.setAnimation(WHEEL_LEFT);
			else this.sprite.setAnimation(WHEEL_RIGHT);
		}
	}
	else{
		if(this.sprite.y >= 640) this.sprite.y += 32;
		if(this.map.collisionMoveDownWheel(this.sprite)) this.sprite.y -=1;
		if(this.direction == LEFT){		
			if(this.sprite.currentAnimation != WHEEL_LEFT) this.sprite.setAnimation(WHEEL_LEFT);
			this.sprite.x -= 2;
			if(this.map.collisionMoveLeftWheel(this.sprite)){
				this.sprite.x += 2;
				this.direction = RIGHT;
			}
		}
		else{
			if(this.sprite.currentAnimation != WHEEL_RIGHT)this.sprite.setAnimation(WHEEL_RIGHT);
			this.sprite.x += 2;
			if(this.map.collisionMoveRightWheel(this.sprite)){
				this.sprite.x -= 2;
				this.direction = LEFT;
			}
		}
		// Move PIRATE so that it is affected by gravity
		
		this.sprite.y += 6;
		if(this.map.collisionMoveDownWheel(this.sprite))this.isfalling = false;
		else this.isfalling = true;
		// Update sprites
		
	}
	this.sprite.update(deltaTime);	
}

Wheel.prototype.draw = function()
{
	this.sprite.draw();
}

Wheel.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width , this.sprite.y + this.sprite.height);
	
	return box;
}

Wheel.prototype.killed = function()
{
	this.Dead = true;
	this.sprite.x = 0;
	this.sprite.y = 0;
}


