
// 2D boxes for collision detection

function Box(min_x, min_y, max_x, max_y)
{
	this.min_x = min_x;
	this.max_x = max_x;
	this.min_y = min_y;
	this.max_y = max_y;
}

Box.prototype.intersect = function(box2)
{
	return (this.max_x >= box2.min_x) && (box2.max_x >= this.min_x) &&
	       (this.max_y >= box2.min_y) && (box2.max_y >= this.min_y);
}

Box.prototype.whereCollide = function(box2)
{
	
	var collide = 0;//izquierda 1, derecha 2, arriba 3, abajo 4
	y1 =  (this.max_y+this.min_y)/2;
	y2 =  (box2.max_y+box2.min_y)/2;
	x1 =  (this.max_x+this.min_x)/2;
	x2 =  (box2.max_x+box2.min_x)/2;
	diffX= x2-x1;
	diffY= y2-y1;
	if(Math.abs(diffX)>=(Math.abs(diffY))){//Lateral collision
		if(diffX>=0)
		collide = 1;//Left
		else collide = 2;//Right
	}
	else{ //Vertical collision
		if(diffY>=0)
		collide = 3;//Down
		else collide = 4;//Up
	}
	
	return collide;
}


