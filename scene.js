

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [30, 19], [0, 32], level01);
	
	// Create entities
	this.barrels = []
	this.barrelsActive = []
	this.createBarrels();
	this.barrelsInt = []
	this.barrelsIntActive = []
	this.createBarrelsInt();

	this.player = new Player(224, 240, this.map);
	this.playerALive = true;

	this.enemies_sharks = [];
	this.enemies_sharks.push(new Shark(334, 240, this.map));
	this.sharksActive = [];
	this.sharksActive.push(true);
	
	// Store current time
	this.currentTime = 0;

	this.textactive = false;
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Update entities
	this.player.update(deltaTime);
	for(var i = 0; i < this.barrels.length; i++){
		this.barrels[i].update(deltaTime);
	}
	for(var i = 0; i < this.barrelsInt.length; i++){
		this.barrelsInt[i].update(deltaTime);
	}
	for(var i = 0; i < this.enemies_sharks.length; i++){
		this.enemies_sharks[i].update(deltaTime);
	}
	if(this.player.Alive){
	// Check for collision between entities
		for(var i = 0; i < this.barrels.length; i++){
			if(this.barrelsActive[i]&&this.player.collisionBox().intersect(this.barrels[i].collisionBox()))
				this.barrelsActive[i] = false;
		}
		for(var i = 0; i < this.barrelsInt.length; i++){
			if(this.barrelsIntActive[i]&&this.player.collisionBox().intersect(this.barrelsInt[i].collisionBox()))
				this.barrelsIntActive[i] = false;
		}

		for(var i = 0; i < this.enemies_sharks.length; i++){
			if(this.sharksActive[i]&&this.player.collisionBox().intersect(this.enemies_sharks[i].collisionBox())){
				this.player.hitted();
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

	// Draw tilemap
	this.map.draw();

	// Draw entities
	
	if(!this.player.Dead)this.player.draw();

	for(var i = 0; i < this.barrels.length; i++){	
		if(this.barrelsActive[i] && (this.barrels[i].sprite.x < 800 && this.barrels[i].sprite.x > -40))
			this.barrels[i].draw();
	}
	for(var i = 0; i < this.barrelsInt.length; i++){	
		if(this.barrelsIntActive[i] && (this.barrelsInt[i].sprite.x < 800 && this.barrelsInt[i].sprite.x > -40))
			this.barrelsInt[i].draw();
	}

	for(var i = 0; i < this.enemies_sharks.length; i++){
		if(this.sharksActive[i] && (this.enemies_sharks[i].sprite.x < 800 && this.enemies_sharks[i].sprite.x > -40))
			this.enemies_sharks[i].draw();
	}

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



