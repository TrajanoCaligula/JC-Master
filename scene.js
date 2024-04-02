
const FLAGLAYER = 9;

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01);
	
	// Create entities
	this.barrels = []
	this.barrelsActive = []
	this.createBarrels();

	this.barrelsInt = []
	this.barrelsIntActive = []
	this.createBarrelsInt();

	this.player = new Player(224, 576, this.map);

	this.enemies_sharks = [];
	this.sharksActive = [];
	this.createSharks();

	this.enemies_crabs = [];
	this.crabsActive = [];
	this.createCrabs();

	this.enemies_shells = [];
	this.shellsActive = [];

	this.wheels = [];
	this.wheelsActive = [];

	this.hats = [];
	this.hatsActive = [];

	this.flag = new Flag(1000, 576,this.map);
		
	// Store current time
	this.currentTime = 0;

	this.drawHitBoxesState = false; // FOR DEBUBBING
	this.displacement=0;
	this.end = false;
}


Scene.prototype.update = function(deltaTime)
{
	this.currentTime += deltaTime;
	if(this.end){

	}
	else{
		// Keep track of time
		if(keyboard[85])this.drawHitBoxesState = !this.drawHitBoxesState;//FOR DEBUBBING

		this.player.update(deltaTime);
		
		//Displacement
		if((this.player.sprite.x-this.displacement)>224){
			this.displacement = this.player.sprite.x-224;
		}
		if(this.player.sprite.x-this.displacement< -7){
			this.player.sprite.x = this.displacement-7;
		}

		// Update entities
		if(this.player.isAlive()){//TODO: NO SE MUEVEN POR ESTO BOBO
		// Check for collision between entities
			for(var i = 0; i < this.barrels.length; i++){
				this.barrelsActive[i] = this.isInsideScreen(this.barrels[i]);
				if(this.barrelsActive[i]){
					this.barrels[i].update(deltaTime);
					if(!this.player.hittedState && this.player.collisionBox().intersect(this.barrels[i].collisionBox())){
						typeCollision = this.player.collisionBox().whereCollide(this.barrels[i].collisionBox());
						if(typeCollision == 4 && this.player.jumpState == 1)
							this.barrels[i].Activated();
					}
				}
				
			}
			for(var i = 0; i < this.barrelsInt.length; i++){
				this.barrelsIntActive[i] = this.isInsideScreen(this.barrelsInt[i]);
				if(this.barrelsIntActive[i]){
					this.barrelsInt[i].update(deltaTime);
					if(!this.player.hittedState && this.player.collisionBox().intersect(this.barrelsInt[i].collisionBox())){
						typeCollision = this.player.collisionBox().whereCollide(this.barrelsInt[i].collisionBox());
						if(typeCollision == 4 && this.player.jumpState == 1)
							if(!this.barrelsInt[i].beenActivated){
								this.hats.push(new Hat(this.barrelsInt[i].sprite.x-16, this.barrelsInt[i].sprite.y-64,this.map));
								this.hatsActive.push(true);
								//this.wheels.push(new Wheel(this.barrelsInt[i].sprite.x, this.barrelsInt[i].sprite.y-64,this.map));
								//this.wheelsActive.push(true);
							}
							this.barrelsInt[i].Activated();
							//testing
							
					}
				}
				
			}

			for(var i = 0; i < this.hats.length; i++){
				this.hatsActive[i] = this.isInsideScreen(this.hats[i]);
				if(this.hatsActive[i] && !this.hats[i].Dead){
					this.hats[i].update(deltaTime);
					if(!this.player.hittedState && !this.hats[i].isDying && this.player.collisionBox().intersect(this.hats[i].collisionBox())){
						this.hats[i].killed();
						this.player.powerUpHat();
					}
				}
			}

			for(var i = 0; i < this.wheels.length; i++){
				this.wheelsActive[i] = this.isInsideScreen(this.wheels[i]);
				if(this.wheelsActive[i] && !this.wheels[i].Dead){
					this.wheels[i].update(deltaTime);
					if(!this.player.hittedState && !this.wheels[i].isDying && this.player.collisionBox().intersect(this.wheels[i].collisionBox())){
						this.wheels[i].killed();
						this.player.powerUpWheel();
					}
				}
			}

			

			for(var i = 0; i < this.enemies_sharks.length; i++){
				this.sharksActive[i] = this.isInsideScreen(this.enemies_sharks[i]);
				if(this.sharksActive[i] && !this.enemies_sharks[i].Dead){
					this.enemies_sharks[i].update(deltaTime);
					if(!this.player.hittedState && !this.enemies_sharks[i].isDying && this.player.collisionBox().intersect(this.enemies_sharks[i].collisionBox())){
						typeCollision = this.player.collisionBox().whereCollide(this.enemies_sharks[i].collisionBox());
						if(typeCollision == 1 || typeCollision == 2 || typeCollision == 4){
							this.player.hitted();
						}
						else{
							this.player.hitsEnemy();
							this.enemies_sharks[i].killed();
						}
					}
				}
			}

			for(var i = 0; i < this.enemies_crabs.length; i++){
				this.crabsActive[i] = this.isInsideScreen(this.enemies_crabs[i]);
				if(this.crabsActive[i] && !this.enemies_crabs[i].Dead){
					this.enemies_crabs[i].update(deltaTime);
					if(!this.player.hittedState && !this.enemies_crabs[i].isDying && this.player.collisionBox().intersect(this.enemies_crabs[i].collisionBox())){
						typeCollision = this.player.collisionBox().whereCollide(this.enemies_crabs[i].collisionBox());
						if(typeCollision == 1 || typeCollision == 2 || typeCollision == 4){
							this.player.hitted();
						}	
						else{	
							this.player.hitsEnemy();
							this.enemies_shells.push(new Shell(this.enemies_crabs[i].sprite.x+20, this.enemies_crabs[i].sprite.y,this.map));
							var size = this.enemies_shells.length;
							this.enemies_shells[size-1].isMoving = false;
							this.shellsActive.push(true);
							this.enemies_crabs[i].killed();
						}
					}
				}
			}

			for(var i = 0; i < this.enemies_shells.length; i++){
				this.shellsActive[i] = this.isInsideScreen(this.enemies_shells[i]);
				if(this.shellsActive[i] && !this.enemies_shells[i].Dead){
					this.enemies_shells[i].update(deltaTime);
					if(!this.player.hittedState && !this.enemies_shells[i].isDying && this.player.collisionBox().intersect(this.enemies_shells[i].collisionBox())){
						typeCollision = this.player.collisionBox().whereCollide(this.enemies_shells[i].collisionBox());

						if(typeCollision == 1){
							if(this.enemies_shells[i].isMoving) this.player.hitted();
							else {
								this.enemies_shells[i].isMoving = true;
								this.enemies_shells[i].direction = RIGHT;
							}
						}
						else if(typeCollision == 2){ 
							if(this.enemies_shells[i].isMoving) this.player.hitted();
							else {
								this.enemies_shells[i].isMoving = true;
								this.enemies_shells[i].direction = LEFT;
							}
						}
						else if(typeCollision == 4){ 
							this.player.hitted();
						}
						else{ 
							if(this.enemies_shells[i].isMoving) {
								this.player.hitsEnemy();
								this.enemies_shells[i].isMoving = false;
								num_anim = this.enemies_shells[i].sprite.currentAnimation;
								if(num_anim == SHELL_MOVE_LEFT) this.enemies_shells[i].sprite.setAnimation(SHELL_STAND_LEFT);
								else this.enemies_shells[i].sprite.setAnimation(SHELL_STAND_RIGHT);
							}
							else {
								this.player.hitsEnemy();
								//this.enemies_shells[i].killed();
							}
						}
					}
				}
			}

			this.flag.update(deltaTime);
			if(!this.player.hittedState && this.player.collisionBox().intersect(this.flag.collisionBox())){
				//TODO
			}
		}
	}
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();
	
	context.translate(Math.floor(-this.displacement),0);
	// Draw tilemap
	this.map.draw();
	this.drawHitBoxes();
	// Draw entities
	
	if(!this.player.Dead)this.player.draw();
	this.flag.draw();
	for(var i = 0; i < this.barrels.length; i++){	
		if(this.barrelsActive[i])
			this.barrels[i].draw();
	}

	for(var i = 0; i < this.barrelsInt.length; i++){	
		if(this.barrelsIntActive[i])
			this.barrelsInt[i].draw();
	}

	for(var i = 0; i < this.enemies_sharks.length; i++){
		if(this.sharksActive[i] && !this.enemies_sharks[i].Dead)
			this.enemies_sharks[i].draw();
	}

	for(var i = 0; i < this.enemies_crabs.length; i++){
		if(this.crabsActive[i] && !this.enemies_crabs[i].Dead)
			this.enemies_crabs[i].draw();
	}

	for(var i = 0; i < this.enemies_shells.length; i++){
		if(this.shellsActive[i] && !this.enemies_shells[i].Dead)
			this.enemies_shells[i].draw();
	}
	for(var i = 0; i < this.wheels.length; i++){
		if(this.wheelsActive[i] && !this.wheels[i].Dead)
			this.wheels[i].draw();
	}
	for(var i = 0; i < this.hats.length; i++){
		if(this.hatsActive[i] && !this.hats[i].Dead)
			this.hats[i].draw();
	}
	
	context.restore();
}


Scene.prototype.createBarrels = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[4].data[pos];
			if(tileId != 0){
				this.barrels.push(new Barrel(i*32+0, 32+32*j));
				this.barrelsActive.push(true);
			}
		}
}

Scene.prototype.createBarrelsInt = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[5].data[pos];
			if(tileId != 0){
				this.barrelsInt.push(new Intbarrel(i*32+0, 32+32*j));
				this.barrelsIntActive.push(true);
			}
		}
}

Scene.prototype.createSharks = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[6].data[pos];
			if(tileId != 0){
				this.enemies_sharks.push(new Shark(i*32+0, 32+32*j-32,this.map));
				this.sharksActive.push(true);
			}
		}
}

Scene.prototype.createCrabs = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[7].data[pos];
			if(tileId != 0){
				this.enemies_crabs.push(new Crab(i*32+0, 32+32*j-32,this.map));
				this.crabsActive.push(true);
			}
		}
}

Scene.prototype.isInsideScreen = function(obj){
	if(obj.sprite.x < 1000+this.displacement && obj.sprite.x > this.displacement-300)
		return true;
	else
		return false;
}

Scene.prototype.drawHitBoxes = function(){
	if(this.drawHitBoxesState){
		this.quads = new Array();
		var box = this.player.collisionBox();
		this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "blue"));
		for(var i = 0; i < this.barrels.length; i++){
			if(this.barrelsActive[i]){
				box = this.barrels[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "purple"));
			}
		}
		for(var i = 0; i < this.barrelsInt.length; i++){
			if(this.barrelsIntActive[i]){
				box = this.barrelsInt[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "yellow"));
			}
		}
		for(var i = 0; i < this.enemies_sharks.length; i++){
			if(this.sharksActive[i] && !this.enemies_sharks[i].Dead){
				box = this.enemies_sharks[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "red"));
			}
		}
		for(var i = 0; i < this.enemies_crabs.length; i++){
			if(this.crabsActive[i] && !this.enemies_crabs[i].Dead){
				box = this.enemies_crabs[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "green"));
			}
		}
		for(var i = 0; i < this.enemies_shells.length; i++){
			if(this.shellsActive[i] && !this.enemies_shells[i].Dead){
				box = this.enemies_shells[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "pink"));
			}
		}
		for(var i = 0; i < this.wheels.length; i++){
			if(this.wheelsActive[i] && !this.wheels[i].Dead){
				box = this.wheels[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "brown"));
			}
		}
		for(var i = 0; i < this.hats.length; i++){
			if(this.hatsActive[i] && !this.hats[i].Dead){
				box = this.hats[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "black"));
			}
		}
		box = this.flag.collisionBox();
		this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "cyan"));
		for(var i = 0; i < this.quads.length; i++){
			this.quads[i].draw();
		}
	}
}
