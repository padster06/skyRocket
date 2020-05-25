class Asteroid {
	constructor(border) {
		this.imgAsteroid = new Image();
		this.imgAsteroid.src = 'gfx/asteroid.png';
		this.x = Math.floor(Math.random()*border.width+20)-20
		this.y = Math.floor(Math.random()*-200)
		this.width = 100;
		this.height = 70;
	}
	move(border,speed) {
		this.y+=(speed);
		if(this.y > 800){
			this.y = Math.floor(Math.random()*-200);
			this.x = Math.floor(Math.random()*border.width+20)-120;
		}
	}
	getX1(){
		return this.x;
	}
	//Top side
	getY1(){
		return this.y;
	}
	//Right side
	getX2(){
		return this.x+this.width;
	}
	//Bottom side
	getY2(){
		return this.y+this.height;
	}
	//Collision check
	doesCollideWith(boxToCheck){
		var buffer=false;
		//Has this boxes right side made contact with another boxes left side
		if(this.getX2()>=boxToCheck.getX1() && this.getX2()<=boxToCheck.getX2() && this.getY1()<=boxToCheck.getY2() && this.getY2()>=boxToCheck.getY1()){
			//Yes
			buffer=true;
		}
		//Has this boxes left side made contact with another boxes right side
		if(this.getX1()<=boxToCheck.getX2() && this.getX1()>=boxToCheck.getX1() && this.getY1()<=boxToCheck.getY2() && this.getY2()>=boxToCheck.getY1()){
			//Yes
			buffer=true;
		}
		//Has this boxes top side made contact with another boxes bottom side
		if(this.getX1()<=boxToCheck.getX2() && this.getX2()>=boxToCheck.getX1() && this.getY1()<=boxToCheck.getY2() && this.getY1()>=boxToCheck.getY1()){
			//Yes
			buffer=true;
		}
		//Has this boxes bottom side made contact with another top bottom side
		if(this.getX1()<=boxToCheck.getX2() && this.getX2()>=boxToCheck.getX1() && this.getY2()>=boxToCheck.getY1() && this.getY2()<=boxToCheck.getY2()){
			//Yes
			buffer=true;
		}
		return buffer;
	}
}


