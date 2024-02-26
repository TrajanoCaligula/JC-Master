
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

Box.prototype.wherecollide = function(box2)
{
	
	var collide = 0;//izquierda 1, derecha 2, arriba 3, abajo 4
	pixelsY1 =  this.max_y-box2.min_y;
	pixelsY2 =  box2.max_y-this.min_y;
	pixelsX1 =  this.max_x-box2.min_x;
	pixelsX2 =  box2.max_x-this.min_x;

	if(pixelsY1 > 0){
		if(pixelsX1 > 0){
			if(pixelsX1 <= pixelsY1 && pixelsX1< pixelsX2){
				collide = 2;
			}
			else collide = 4;
		}
		else {
			if(pixelsX2 < pixelsY1 && pixelsX1> pixelsX2){
				collide = 1;
			}
			else collide = 4;
		}
	}
	else if(pixelsY2 > 0){
		if(pixelsX1 > 0){
			if(pixelsX1 < pixelsY1 && pixelsX1< pixelsX2){
				collide = 2;
			}
			else collide = 3;
		}
		else{
			if(pixelsX2 < pixelsY1 && pixelsX1> pixelsX2){
				collide = 1;
			}
			else collide =3;
		}
	}
	else if(pixelsX1 > 0){
		collide = 2;
	}
	else if(pixelsX2 > 0){
		collide = 1;
		
	}	
	/*if (caja1MinY <= caja2MaxY && caja1MaxY >= caja2MinY) {
		if (caja1MinX <= caja2MaxX) {
			collide =1;//izquirda
		} else if (caja1MaxX >= caja2MinX) {
			collide =2;//derecha
		}
	  } else if (caja1MinX <= caja2MaxX && caja1MaxX >= caja2MinX) {
		if (caja1MinY <= caja2MaxY) {
			collide =3;//arriba
		} else if (caja1MaxY >= caja2MinY) {
			collide =4;//abajo
		}
	  }*/

	  if(collide == 0 || collide == 1 || collide == 2 || collide == 3){
		return false;
	  }
	  else return false;
}


