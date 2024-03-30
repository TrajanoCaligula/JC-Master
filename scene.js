

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
							this.barrelsInt[i].Activated();
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
							this.enemies_sharks[i].killed();
						}
					}
				}
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
				//this.enemies_crabs.push(new Crab(i*32+0, 32+32*j-32,this.map));
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
		for(var i = 0; i < this.quads.length; i++){
			this.quads[i].draw();
		}
	}
}
