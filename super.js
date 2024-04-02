const WHEEL_BORN = 0;
const WHEEL_LEFT = 1;
const WHEEL_RIGHT = 2;

function Wheel(x, y, map)
{
	// Loading spritesheets
	var super = new Texture("Textures/Characters/Shell.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 20, super);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_BORN, [608, 32, 32, 32]);

	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_LEFT, [608, 0, 32, 32]); 
	this.sprite.addKeyframe(WHEEL_LEFT, [576, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [544, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [512, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [480, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [448, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [416, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [384, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [352, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [320, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [288, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [256, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [224, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [192, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [160, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [128, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(WHEEL_LEFT, [0, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WHEEL_RIGHT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [160, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [192, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [224, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [256, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [288, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [320, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [352, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [384, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [416, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [448, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [480, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [512, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [544, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [576, 32, 32, 32]);
	this.sprite.addKeyframe(WHEEL_RIGHT, [608, 32, 32, 32]);

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
	this.bornTime = 200;
	
}


Wheel.prototype.update = function(deltaTime)
{
	if(this.Dead)return;
	if(!this.isBorn){
		this.sprite.update(deltaTime);
		this.bornTime -= deltaTime;
		if(this.bornTime <= 0) this.isBorn = true;
	}
	
	else{
		if(this.direction == LEFT){
			this.jumpAngle += 4;
			if(this.jumpAngle >= 180)
			{
				this.sprite.y += 5;
				if(this.sprite.y > 800) this.Dead = true;
			}
			else{
				this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
			}
			if(this.sprite.currentAnimation != WHEEL_LEFT) this.sprite.setAnimation(WHEEL_LEFT);
				this.sprite.x -= 3;
				if(this.map.collisionMoveLeft(this.sprite)){
					this.sprite.x += 3;
					this.direction = RIGHT;
				}
			}
			else{
				if(this.sprite.currentAnimation != WHEEL_RIGHT)this.sprite.setAnimation(WHEEL_RIGHT);
				this.sprite.x += 3;
				if(this.map.collisionMoveRight(this.sprite)){
					this.sprite.x -= 3;
					this.direction = LEFT;
				}
			}
		}
					
		// Move PIRATE so that it is affected by gravity
		this.sprite.y += 6;
		if(this.map.collisionMoveDown(this.sprite)) this.isfalling = false;
		else this.isfalling = true;
		// Update sprites
		this.sprite.update(deltaTime);
	}
	
}

Wheel.prototype.draw = function()
{
	this.sprite.draw();
}

Wheel.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 1, this.sprite.y+30, this.sprite.x + this.sprite.width - 20, this.sprite.y + this.sprite.height);
	
	return box;
}

Wheel.prototype.killed = function()
{
	this.Dead = true;
}

