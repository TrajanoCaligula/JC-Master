const SHELL_STAND_LEFT = 0;
const SHELL_STAND_RIGHT = 1;
const SHELL_MOVE_LEFT = 2;
const SHELL_MOVE_RIGHT = 3;

function Shell(x, y, map)
{
	// Loading spritesheets
	var shell = new Texture("Textures/Characters/Shell.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 20, shell);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHELL_STAND_LEFT, [0, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHELL_STAND_RIGHT, [608, 32, 32, 32]);	

	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [608, 0, 32, 32]); 
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [576, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [544, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [512, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [480, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [448, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [416, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [384, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [352, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [320, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [288, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [256, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [224, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [192, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [160, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [128, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_LEFT, [0, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [160, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [192, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [224, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [256, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [288, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [320, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [352, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [384, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [416, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [448, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [480, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [512, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [544, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [576, 32, 32, 32]);
	this.sprite.addKeyframe(SHELL_MOVE_RIGHT, [608, 32, 32, 32]);

	// Set initial animation
	this.sprite.setAnimation(SHELL_STAND_LEFT);

	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.jumpAngle = 0;
	this.isfalling = 0;
	this.direction = LEFT;

	this.isMoving = false;
	this.setCD();

	this.Dead = false;
	this.isDying = false;
	this.DyingTime = 240;
	this.goDown = false;

	this.sound = AudioFX('Sounds/shell.mp3');
	
}


Shell.prototype.update = function(deltaTime)
{
	if(this.Dead)return;
	if(!this.vulerabilityCD){
		this.CDTime -= deltaTime;
		if(this.CDTime <= 0) this.vulerabilityCD = true;
	} 
	else if(this.isDying){
		if(this.direction == LEFT){
			if(this.sprite.currentAnimation != SHELL_MOVE_LEFT)this.sprite.setAnimation(SHELL_MOVE_LEFT);
		}
		else{
			if(this.sprite.currentAnimation != SHELL_MOVE_RIGHT)this.sprite.setAnimation(SHELL_MOVE_RIGHT);
		}
		this.sprite.update(deltaTime);
		this.DyingTime -= deltaTime;
		if(this.DyingTime <= 120 && !this.goDown){
			this.sprite.y += 10;
			this.goDown = true;
		}
		if(this.DyingTime <= 0){
			this.sprite.x = 0;
			this.sprite.y = 0;	
			this.Dead = true;
		}
	}

	else{
		if(this.isMoving){
			if(this.direction == LEFT){
				if(this.sprite.currentAnimation != SHELL_MOVE_LEFT)this.sprite.setAnimation(SHELL_MOVE_LEFT);
				this.sprite.x -= 5;
				if(this.map.collisionMoveLeftShell(this.sprite)){
					this.sprite.x += 5;
					this.direction = RIGHT;
				}
			}
			else{
				if(this.sprite.currentAnimation != SHELL_MOVE_RIGHT)this.sprite.setAnimation(SHELL_MOVE_RIGHT);
				this.sprite.x += 5;
				if(this.map.collisionMoveRightShell(this.sprite)){
					this.sprite.x -= 5;
					this.direction = LEFT;
				}
			}
		}
		else {
			if(this.direction == LEFT){
				if(this.sprite.currentAnimation != SHELL_STAND_LEFT)this.sprite.setAnimation(SHELL_STAND_LEFT);
			}
			else{
				if(this.sprite.currentAnimation != SHELL_STAND_RIGHT)this.sprite.setAnimation(SHELL_STAND_RIGHT);
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

Shell.prototype.draw = function()
{
	this.sprite.draw();
}

Shell.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 1, this.sprite.y+30, this.sprite.x + this.sprite.width - 20, this.sprite.y + this.sprite.height);
	
	return box;
}

Shell.prototype.setCD = function()
{
	this.vulerabilityCD = false;
	this.CDTime = 1000;
}

Shell.prototype.killed = function()
{
	this.sound.play();
	this.isDying = true;
}


