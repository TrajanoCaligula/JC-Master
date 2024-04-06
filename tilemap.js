
// Tilemap. Draws a tilemap using a texture as a tilesheet.
const TERRAIN = 8;
function Tilemap(tilesheet, tileSize, blockGrid, basePos, map)
{
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;
	this.ogMap = JSON.parse(JSON.stringify(map));
	this.map = JSON.parse(JSON.stringify(map));
	this.limitY = 640;
	this.killY = 800;

	this.tilesheet = tilesheet;
}

Tilemap.prototype.draw = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId;
	context.imageSmoothingEnabled = false;
	for(var j=0, pos=0; j<this.map.height; j++)
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];
			if(tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
				                	this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			tileId = this.map.layers[1].data[pos];
			if(tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
									this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			tileId = this.map.layers[2].data[pos];
			if(tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
									this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			tileId = this.map.layers[3].data[pos];
			if(tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
									this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			tileId = this.map.layers[TERRAIN].data[pos];
			if(tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
									this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
									
		}
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function(sprite)
{
	var x = Math.floor((sprite.x + 18 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRight = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 18 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

Tilemap.prototype.collisionMoveLeftCrab = function(sprite)
{
	var x = Math.floor((sprite.x + 5 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRightCrab = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 50 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}
Tilemap.prototype.collisionMoveDownCrab = function(sprite){
	var y = Math.floor((sprite.y + sprite.height-1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x +4 - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width -60- this.basePos[0]) / this.tileSize[0]);
	
	for(var x=x0; x<=x1; x++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
	}
	
	return false;

}

Tilemap.prototype.collisionMoveLeftShell = function(sprite)
{
	var x = Math.floor((sprite.x + 5 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRightShell = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 20 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result, and if it collides, it changes its Y position so as to avoid it.

Tilemap.prototype.collisionMoveDown = function(sprite)
{
	var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x + 18 - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 18 - this.basePos[0]) / this.tileSize[0]);
	
	for(var x=x0; x<=x1; x++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
	}
	
	return false;
}



// Computes if the top of a sprite collides with the tilemap.
// Returns a boolean with the result, and if it collides, it changes its Y position so as to avoid it.

Tilemap.prototype.collisionMoveUp = function(sprite)
{
  var y = Math.floor((sprite.y + sprite.height-7 - this.basePos[1]) / this.tileSize[1]);
  var x0 = Math.floor((sprite.x + 18 - this.basePos[0]) / this.tileSize[0]);
  var x1 = Math.floor((sprite.x + sprite.width - 18 - this.basePos[0]) / this.tileSize[0]);

  for (var x = x0; x <= x1; x++) {
    if (this.map.layers[TERRAIN].data[(y - 1) * this.map.width + x] != 0) {
		return true;
    }
	if (this.map.layers[5].data[(y - 1) * this.map.width + x] != 0) {
		return true;
    }
	if (this.map.layers[4].data[(y - 1) * this.map.width + x] != 0) {
		return true;
    }
  }

  return false;
}

Tilemap.prototype.collisionMoveDownWheel = function(sprite)
{
	var y = Math.floor((sprite.y + sprite.height - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x+3 - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width-3 - this.basePos[0]) / this.tileSize[0]);
	
	for(var x=x0; x<=x1; x++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
	}
	
	return false;
}

Tilemap.prototype.collisionMoveLeftWheel = function(sprite)
{
	var x = Math.floor((sprite.x+3  - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

Tilemap.prototype.collisionMoveRightWheel = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width -3- this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[TERRAIN].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[5].data[y * this.map.width + x] != 0)
			return true;
		else if(this.map.layers[4].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}