const STAND_LEFT = 0;
const STAND_RIGHT = 1;
const WALK_LEFT = 2;
const WALK_RIGHT = 3;

function EnemyAvatar(x, y)
{
	// Loading spritesheets
	if(Math.random()  >= 0.5){
		this.isShark(x, y);
	}else{
		this.isCrab(x, y);
	}

	// Set initial animation
	this.sprite.setAnimation(STAND_LEFT);
	
	// Set tilemap for collisions	
	this.directionLeft = true;
	this.walk=false;
	this.timerNewAct = 0;
}

EnemyAvatar.prototype.update = function(deltaTime)
{
	if(this.timerNewAct >=3000){
		this.timerNewAct = 0;
		if(Math.random()  >= 0.5){
			this.walk = !this.walk;
		}
		if(Math.random()  == 0.5){
			this.directionLeft = !this.directionLeft;
		}
		this.walk = !this.walk;
	}
	if(this.walk){
		if(this.directionLeft){
			if(this.sprite.currentAnimation != WALK_LEFT)this.sprite.setAnimation(WALK_LEFT);
			this.sprite.x -= 1;
			if(this.sprite.x < 8){
				this.directionLeft = false;
				this.sprite.x = 8;
				this.sprite.setAnimation(WALK_RIGHT);
			}
		}else{
			if(this.sprite.currentAnimation != WALK_RIGHT)this.sprite.setAnimation(WALK_RIGHT);
			this.sprite.x += 1;
			if(this.sprite.x > 800){
				this.directionLeft = true;
				this.sprite.x = 800;
				this.sprite.setAnimation(WALK_LEFT);
			}
		}
	}
	else{
		if(this.directionLeft){
			if(this.sprite.currentAnimation != STAND_LEFT)this.sprite.setAnimation(STAND_LEFT);
		}else{
			if(this.sprite.currentAnimation != STAND_RIGHT)this.sprite.setAnimation(STAND_RIGHT);
		}
	}
	// Update sprites
	this.timerNewAct += deltaTime;
	this.sprite.update(deltaTime);
}

EnemyAvatar.prototype.draw = function()
{
	this.sprite.draw();
}

EnemyAvatar.prototype.isShark = function(x, y){
	var shark = new Texture("Textures/Characters/Shark.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 8, shark);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(STAND_LEFT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [128, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [160, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [192, 0, 32, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [224, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(STAND_RIGHT, [224, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [192, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [160, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [128, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [96, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [64, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [32, 224, 32, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [0, 224, 32, 32]);

	//WALK

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_LEFT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [160, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_RIGHT, [224, 256, 32, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [192, 256, 32, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [160, 256, 32, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [128, 256, 32, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [96, 256, 32, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [64, 256, 32, 32]);
}

EnemyAvatar.prototype.isCrab = function(x, y){
	// Loading spritesheets
	var carb = new Texture("Textures/Characters/Crab.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 128, 64, 7, carb);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(STAND_LEFT, [0, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [64, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [128, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [192, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [256, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [320, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [384, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [448, 0, 64, 32]);
	this.sprite.addKeyframe(STAND_LEFT, [512, 0, 64, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(STAND_RIGHT, [512, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [448, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [384, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [320, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [256, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [192, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [128, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [64, 160, 64, 32]);
	this.sprite.addKeyframe(STAND_RIGHT, [0, 160, 64, 32]);
	//WALK

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_LEFT, [0, 32, 64, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [64, 32, 64, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [128, 32, 64, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [192, 32, 64, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [256, 32, 64, 32]);
	this.sprite.addKeyframe(WALK_LEFT, [320, 32, 64, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_RIGHT, [512, 192, 64, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [448, 192, 64, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [384, 192, 64, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [320, 192, 64, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [256, 192, 64, 32]);
	this.sprite.addKeyframe(WALK_RIGHT, [192, 192, 64, 32]);
}



