
const PIRATE_STAND_LEFT = 0;
const PIRATE_STAND_RIGHT = 1;
const PIRATE_WALK_LEFT = 2;
const PIRATE_WALK_RIGHT = 3;
const PIRATE_RUN_LEFT = 4;
const PIRATE_RUN_RIGHT = 5;
const PIRATE_JUMP_LEFT = 6;
const PIRATE_JUMP_RIGHT = 7;
const PIRATE_FALL_LEFT = 8;
const PIRATE_FALL_RIGHT = 9;
const PIRATE_HIT_LEFT = 10;
const PIRATE_HIT_RIGHT = 11;

//Movement
const MINWALKSPEED = 60;
const WALKACCEL = 60;
const RUNACCEL = 120;
const RELEASDECEL = 360;
const MAXWALKSPEED = 120;
const MAXRUNSPEED = 240;


function Player(x, y, map)
{
	// Loading spritesheets	
	this.listSprites = [];

	var smallPirate = new Texture("Textures/Characters/PirateMini.png");
	this.insertSprite(x,y,smallPirate);

	var bigPirate = new Texture("Textures/Characters/Pirate.png");
	this.insertSprite(x,y,bigPirate);

	var smallStarPirate = new Texture("Textures/Characters/PirateMiniSTAR.png");
	this.insertSprite(x,y,smallStarPirate);

	var bigPirateSTAR = new Texture("Textures/Characters/PirateSTAR.png");
	this.insertSprite(x,y,bigPirateSTAR);

	// Set initial animation
	this.sprite = this.listSprites[0];//TODO: Change this to spriteSmallPirate
	this.sprite.setAnimation(PIRATE_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.bJumping = false;
	this.left = false;
	this.jumpAngle = 0;

	this.Alive = true;
	this.Dead = false;
	this.size = 0;

	//Vulnerability
	this.vulnerability = true;
	this.vulnerabilityTime = 0;
	this.vulnerabilityTimeMax = 6000;
	this.vulnerabilityTime = 0;

	//To be Hitted
	this.hittedState = false;
	this.hittedStateTime = 0;
	this.nextAnimationAfterHitted = 0;

	//Movement
	this.speed = 0;
	this.accel = 0;
	this.Running = false;
	this.incrementX = 0;

}


Player.prototype.update = function(deltaTime)
{
	
	if(this.Dead)return;//IS COMPLEATLY DEAD
	else if(!this.Alive){//ANIMATION DEAD
		this.jumpAngle += 4;
		if(this.jumpAngle >= 180)
		{
			this.sprite.y = this.sprite.y + 5;
			if(this.sprite.y > 800)this.Dead = true;
		}
		else{
			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
		}
	}
	else{ // Move PIRATE sprite left/right
		if(this.hittedState){//HITTED
			this.hittedStateTime -= (deltaTime);//Contador para tiempo de invulnerabilidad y quieto
			if(this.hittedStateTime <= 0){
				this.hittedState = false;//ya no esta siendo golpeado
				this.hittedStateTime = 0;
				this.changeSize();//cambiamos tamaño
				this.sprite.setAnimation(this.nextAnimationAfterHitted);//ponemos la animación en la que estaba anteriormente
				if(this.bJumping){
					if(this.jumpAngle>90){//si antes estaba saltando y ahora cayendo se actualiza
						if(this.sprite.currentAnimation == PIRATE_HIT_LEFT)this.sprite.setAnimation(PIRATE_FALL_LEFT);
						else if(this.sprite.currentAnimation == PIRATE_HIT_RIGHT)this.sprite.setAnimation(PIRATE_FALL_RIGHT);
					}
					else{//
						if(this.sprite.currentAnimation == PIRATE_HIT_LEFT)this.sprite.setAnimation(PIRATE_JUMP_LEFT);
						else if(this.sprite.currentAnimation == PIRATE_HIT_RIGHT)this.sprite.setAnimation(PIRATE_JUMP_RIGHT);
					}
				}
			}
			
		}
		else if(keyboard[37]) // KEY_LEFT
		{
			if(this.bJumping){
				if(this.sprite.currentAnimation == PIRATE_JUMP_RIGHT)
					this.sprite.setAnimation(PIRATE_JUMP_LEFT);
				if(this.sprite.currentAnimation == PIRATE_FALL_RIGHT)
					this.sprite.setAnimation(PIRATE_FALL_LEFT);
			}
			else{
				if(this.sprite.currentAnimation != PIRATE_WALK_LEFT  && !this.Running)
					this.sprite.setAnimation(PIRATE_WALK_LEFT)
				else if(this.sprite.currentAnimation != PIRATE_RUN_LEFT && this.Running)
					this.sprite.setAnimation(PIRATE_RUN_LEFT);
			}	


			if(this.speed > -MINWALKSPEED)
				this.speed = -MINWALKSPEED
			if(keyboard[16] && this.Running){
				this.accel = -RUNACCEL
			}	
			else{
				this.accel = -WALKACCEL
			}	

			this.incrementX = this.speed * deltaTime / 1000.0

			this.sprite.x += this.incrementX
			if (this.sprite.x < -7){//TODO: Adapatar a displaicement
				this.sprite.x -= this.incrementX;
				this.incrementX = 0;
				this.speed = 0;
				if(this.sprite.currentAnimation != PIRATE_STAND_LEFT &&(this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_RUN_LEFT)) this.sprite.setAnimation(PIRATE_STAND_LEFT);
			} 
			if(this.map.collisionMoveLeft(this.sprite)){
				this.sprite.x -= this.incrementX;
				console.log("Collision");
				this.incrementX = 0;
				this.speed = 0;
				if(this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_RUN_LEFT) this.sprite.setAnimation(PIRATE_STAND_LEFT);
			}
			
			this.speed = this.speed + this.accel * deltaTime / 1000.0
			if(keyboard[16] && this.Running){
				if(Math.abs(this.speed) > MAXRUNSPEED)this.speed = -MAXRUNSPEED
			}
					
			else{
				if(!keyboard[16] && Math.abs(this.speed) > MAXWALKSPEED){
					this.speed = -MAXWALKSPEED;
					this.Running = false;
				}
				else if(keyboard[16] && Math.abs(this.speed)>=MAXWALKSPEED)this.Running = true				
			}

		}
		else if(keyboard[39]) // KEY_RIGHT
		{
			if(this.bJumping){
				if(this.sprite.currentAnimation == PIRATE_JUMP_LEFT)
					this.sprite.setAnimation(PIRATE_JUMP_RIGHT);
				if(this.sprite.currentAnimation == PIRATE_FALL_LEFT)
					this.sprite.setAnimation(PIRATE_FALL_RIGHT);
			}
			else{
				if(this.sprite.currentAnimation != PIRATE_WALK_RIGHT  && !this.Running)
					this.sprite.setAnimation(PIRATE_WALK_RIGHT)
				else if(this.sprite.currentAnimation != PIRATE_RUN_RIGHT && this.Running)
					this.sprite.setAnimation(PIRATE_RUN_RIGHT);
			}	

			if(this.speed < MINWALKSPEED)
				this.speed = MINWALKSPEED
			if(keyboard[16] && this.Running){
				this.accel = RUNACCEL
			}	
			else{
				this.accel = WALKACCEL
			}	

			this.incrementX = this.speed * deltaTime / 1000.0

			this.sprite.x += this.incrementX
			if(this.map.collisionMoveRight(this.sprite) ){
				this.sprite.x -= this.incrementX;
				this.incrementX = 0;
				this.speed = 0;
				if(this.sprite.currentAnimation == PIRATE_WALK_RIGHT || this.sprite.currentAnimation == PIRATE_RUN_RIGHT) this.sprite.setAnimation(PIRATE_STAND_RIGHT);
			}
				

			this.speed = this.speed + this.accel * deltaTime / 1000.0
			if(keyboard[16] && this.Running){
				if(Math.abs(this.speed) > MAXRUNSPEED)this.speed = MAXRUNSPEED;
			}
					
			else{
				if(!keyboard[16] && Math.abs(this.speed) > MAXWALKSPEED){
					this.speed = MAXWALKSPEED;
					this.Running = false;
				}
				else if(keyboard[16] && Math.abs(this.speed)>=MAXWALKSPEED)this.Running = true					
			}
		}
		else//Si estamos quietos cambiamos la animacion a parado
		{
			if(!this.bJumping){//Si no estamos saltando y no estamos siendo golpeados cambiamos la animacion a parado
				if((this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_FALL_LEFT) && this.speed > -30)
					this.sprite.setAnimation(PIRATE_STAND_LEFT);
				else if((this.sprite.currentAnimation == PIRATE_WALK_RIGHT || this.sprite.currentAnimation == PIRATE_FALL_RIGHT) && this.speed < 30)
					this.sprite.setAnimation(PIRATE_STAND_RIGHT);
				else if((this.sprite.currentAnimation == PIRATE_RUN_LEFT || this.sprite.currentAnimation == PIRATE_FALL_LEFT) && !this.Running)
					this.sprite.setAnimation(PIRATE_WALK_LEFT);
				else if((this.sprite.currentAnimation == PIRATE_RUN_RIGHT || this.sprite.currentAnimation == PIRATE_FALL_RIGHT) && !this.Running)
					this.sprite.setAnimation(PIRATE_WALK_RIGHT);
			}

			if(this.speed > 0) this.accel = -RELEASDECEL
			else if(this.speed < 0) this.accel = RELEASDECEL
			else this.accel = 0
			
			this.incrementX = this.speed * deltaTime / 1000.0
			this.sprite.x += this.incrementX
			if (this.sprite.x < -7) this.sprite.x -= this.incrementX;
			if(this.map.collisionMoveRight(this.sprite)|| this.map.collisionMoveLeft(this.sprite)){
				this.sprite.x -= this.incrementX;
				this.incrementX = 0;
				this.speed = 0;
				if(this.sprite.currentAnimation == PIRATE_WALK_RIGHT || this.sprite.currentAnimation == PIRATE_RUN_RIGHT) this.sprite.setAnimation(PIRATE_STAND_RIGHT);
				else if(this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_RUN_LEFT) this.sprite.setAnimation(PIRATE_STAND_LEFT);
			}

			if(this.speed > 0){
				this.speed = this.speed + this.accel * deltaTime / 1000.0
				if(this.speed < MINWALKSPEED) this.speed = 0

			} 
			else if(this.speed < 0){
				this.speed = this.speed + this.accel * deltaTime / 1000.0
				if(this.speed > -MINWALKSPEED) this.speed = 0
			}
			if(Math.abs(this.speed) <= MAXWALKSPEED) this.Running = false
			
		}
		if(this.bJumping)//Estado saltando
		{
			this.jumpAngle += 4;
			if(this.jumpAngle >= 180)//Si el angulo es mayor que 180, el salto ha terminado
			{
				this.bJumping = false;
				this.sprite.y = this.startY;
			}
			else
			{
				if((this.sprite.currentAnimation == PIRATE_STAND_LEFT || this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_RUN_LEFT) && this.sprite.currentAnimation != PIRATE_JUMP_LEFT && this.sprite.currentAnimation != PIRATE_FALL_LEFT)
					this.sprite.setAnimation(PIRATE_JUMP_LEFT);
				else if((this.sprite.currentAnimation == PIRATE_STAND_RIGHT || this.sprite.currentAnimation == PIRATE_WALK_RIGHT || this.sprite.currentAnimation == PIRATE_RUN_RIGHT) && this.sprite.currentAnimation != PIRATE_JUMP_RIGHT && this.sprite.currentAnimation != PIRATE_FALL_RIGHT)
					this.sprite.setAnimation(PIRATE_JUMP_RIGHT);
				//calcular la posicion en Y del salto);
				this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);//calcular la posicion en Y del salto
				if(this.jumpAngle > 90){//Si esta descedniendo en el salto
					if(this.sprite.currentAnimation == PIRATE_JUMP_LEFT)
						this.sprite.setAnimation(PIRATE_FALL_LEFT);
					else if(this.sprite.currentAnimation == PIRATE_JUMP_RIGHT)
						this.sprite.setAnimation(PIRATE_FALL_RIGHT);
					this.bJumping = !this.map.collisionMoveDown(this.sprite);
				}
				else if(this.map.collisionMoveUp(this.sprite)){
					//this.sprite.y = this.startY - 96 * Math.sin(3.14159 * (this.jumpAngle-4) / 180);
					this.jumpAngle = 180-this.jumpAngle;
					//this.bJumping = false;
				}
			}
		}
		else
		{
			// Move PIRATE so that it is affected by gravity
			this.sprite.y += 6;
			if(this.map.collisionMoveDown(this.sprite))
			{	
				this.bJumping = false;
				if(!this.bJumping && (this.sprite.currentAnimation == PIRATE_FALL_LEFT || this.sprite.currentAnimation == PIRATE_JUMP_LEFT))
					this.sprite.setAnimation(PIRATE_STAND_LEFT);
				else if(!this.bJumping && (this.sprite.currentAnimation == PIRATE_FALL_RIGHT || this.sprite.currentAnimation == PIRATE_JUMP_RIGHT))
					this.sprite.setAnimation(PIRATE_STAND_RIGHT);
				//this.sprite.y -= 2;
				
				// Check arrow up key. If pressed, jump.
				if ((keyboard[38] || keyboard[32] )&& !this.hittedState)
				{
					this.bJumping = true;
					this.jumpAngle = 0;
					this.startY = this.sprite.y;
				}
			}
			else
			{
				if(this.sprite.currentAnimation == PIRATE_STAND_LEFT || this.sprite.currentAnimation == PIRATE_WALK_LEFT || this.sprite.currentAnimation == PIRATE_RUN_LEFT || this.sprite.currentAnimation == PIRATE_HIT_LEFT)
					this.sprite.setAnimation(PIRATE_FALL_LEFT);
				else if(this.sprite.currentAnimation == PIRATE_STAND_RIGHT || this.sprite.currentAnimation == PIRATE_WALK_RIGHT || this.sprite.currentAnimation == PIRATE_RUN_RIGHT || this.sprite.currentAnimation == PIRATE_HIT_RIGHT)
					this.sprite.setAnimation(PIRATE_FALL_RIGHT);
			}
			
		}
	}

	
	if (keyboard[71]) { //G,star pirate
		anim = this.sprite.currentAnimation;
		x = this.sprite.x;
		y = this.sprite.y;
		this.sprite = this.listSprites[this.size+2];
		this.sprite.setAnimation(anim);
		this.sprite.x = x;
		this.sprite.y = y;
		this.vulnerability = false;
	}
	/*TODO
	if (keyboard[49]) { //1, saltar nivell 1

	}

	if (keyboard[50]) { //2, saltar nivell 2

	}*/
	if (keyboard[77]) { //M, supermario
		this.changeSize()
	}
	if(!this.vulnerability){
		this.vulnerabilityTime += deltaTime;
		if(this.vulnerabilityTime >= this.vulnerabilityTimeMax){
			this.vulnerability = true;
			this.vulnerabilityTime = 0;
			x = this.sprite.x;
			y = this.sprite.y;
			anim = this.sprite.currentAnimation;
			this.sprite = this.listSprites[this.size];
			this.sprite.setAnimation(anim);
			this.sprite.x = x;
			this.sprite.y = y;
		}
	}
	if(this.sprite.y == 640){
		this.hitted();
	}
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function()
{
	this.sprite.draw();
}

Player.prototype.collisionBox = function()
{
    if(this.size == 1)	var box = new Box(this.sprite.x + 12, this.sprite.y+8, this.sprite.x + this.sprite.width - 12, this.sprite.y + this.sprite.height);
    //TODO: else in case we need to change the collision box depending on the size of the player
	else var box = new Box(this.sprite.x + 12, this.sprite.y+25, this.sprite.x + this.sprite.width - 12, this.sprite.y + this.sprite.height);
	return box;
}

Player.prototype.killerCollisionBox = function()
{
	if(this.size == 1)	var box = new Box(this.sprite.x + 8, this.sprite.y+ this.sprite.height+1, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height+2);
	else var box = new Box(this.sprite.x + 8, this.sprite.y+ this.sprite.height+1, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height+2);
	//TODO: else in case we need to change the collision box depending on the size of the player
	return box;
}

Player.prototype.hitted = function()
{
	num_anim = this.sprite.currentAnimation;
	if(this.vulnerability && this.size == 1){ //If the player is vulnerable and is big
		this.nextAnimationAfterHitted = num_anim;
        if(num_anim == PIRATE_STAND_LEFT || num_anim == PIRATE_WALK_LEFT || num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT){
            this.sprite.setAnimation(PIRATE_HIT_LEFT);
        }
        else {
            this.sprite.setAnimation(PIRATE_HIT_RIGHT);
        }
		this.hittedState = true;//HITTED
		this.hittedStateTime = 1000;
	} else if(this.vulnerability){
	    if(num_anim == PIRATE_STAND_LEFT || num_anim == PIRATE_WALK_LEFT || num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT)this.sprite.setAnimation(PIRATE_HIT_LEFT);
        else this.sprite.setAnimation(PIRATE_HIT_RIGHT);
        this.Alive = false;
        this.jumpAngle = 0;
        this.startY = this.sprite.y;
	}

}


Player.prototype.hitsFlag = function()
{
   num_anim = this.sprite.currentAnimation;
   if(num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT) this.sprite.setAnimation(PIRATE_FALL_LEFT);
   else this.sprite.setAnimation(PIRATE_FALL_RIGHT);
   //TODO: Go down to the floor and points
}

Player.prototype.powerUpWheel = function() //TODO
{
    this.vulnerability = false;
}

Player.prototype.powerUpHat = function() //TODO
{
    this.size = 1;
}

Player.prototype.powerDownWheel = function() //TODO
{
    this.vulnerability = true;
}

Player.prototype.powerDownHat = function() //TODO
{
    this.size = 0;
}

Player.prototype.isAlive = function()
{
	return this.Alive;
}

Player.prototype.changeSize = function()
{
	anim = this.sprite.currentAnimation;
	if(this.size == 1){//Change to little pirate
		this.size = 0;
		x = this.sprite.x;
		y = this.sprite.y;
		if(this.vulnerability)this.sprite = this.listSprites[0];
		else this.sprite = this.listSprites[2];
		this.sprite.x = x
		this.sprite.y = y
	}
	else{//Change to big pirate
		this.size = 1;
		x = this.sprite.x;
		y = this.sprite.y;
		if(this.vulnerability)this.sprite = this.listSprites[1];
		else this.sprite = this.listSprites[3];
		this.sprite.x = x
		this.sprite.y = y
	}
	this.sprite.setAnimation(anim);
}

Player.prototype.insertSprite = function(x,y, texture)
{

		
		// Prepare CAPITAIN PIRATE
		pirate = new Sprite(x, y, 64, 64, 16, texture);

		//STAND
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_STAND_LEFT, [160, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [160, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [128, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [128, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [96, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [96, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [64, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [64, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [32, 192, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_LEFT, [32, 192, 32, 32]);
	
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [0, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [0, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [32, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [32, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [64, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [64, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [96, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [96, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [128, 0, 32, 32]);
		pirate.addKeyframe(PIRATE_STAND_RIGHT, [128, 0, 32, 32]);
	
	
		//WALK
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_WALK_LEFT, [160, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [160, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [128, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [128, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [96, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [96, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [64, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [64, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [32, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [32, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [0, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_LEFT, [0, 224, 32, 32]);

		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [0, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [0, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [32, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [32, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [64, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [64, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [96, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [96, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [128, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [128, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [160, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_WALK_RIGHT, [160, 32, 32, 32]);

		//RUN
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_RUN_LEFT, [160, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_LEFT, [128, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_LEFT, [96, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_LEFT, [64, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_LEFT, [32, 224, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_LEFT, [0, 224, 32, 32]);

		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [0, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [32, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [64, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [96, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [128, 32, 32, 32]);
		pirate.addKeyframe(PIRATE_RUN_RIGHT, [160, 32, 32, 32]);

	
		//JUMP
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [160, 256, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [160, 256, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [128, 256, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [128, 256, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [96, 256, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_LEFT, [96, 256, 32, 32]);
	
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [0, 64, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [0, 64, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [32, 64, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [32, 64, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [64, 64, 32, 32]);
		pirate.addKeyframe(PIRATE_JUMP_RIGHT, [64, 64, 32, 32]);
	
		//FALL
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_FALL_LEFT, [160, 288, 32, 32]);
	
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_FALL_RIGHT, [0, 96, 32, 32]);
	
		//HIT
		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_HIT_LEFT, [0, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [0, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [32, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [32, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [64, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [64, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [96, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [96, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [128, 160, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_LEFT, [128, 160, 32, 32]);

		pirate.addAnimation();
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [160, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [160, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [128, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [128, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [96, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [96, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [64, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [64, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [32, 352, 32, 32]);
		pirate.addKeyframe(PIRATE_HIT_RIGHT, [32, 352, 32, 32]);

		this.listSprites.push(pirate);	

}



