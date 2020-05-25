class Rocket {
	constructor(x, y) {
		this.width=55;
		this.height=280;
		this.origionalX = x - (this.width/2);
		this.origionalY = y - (this.height/2);
		this.x=this.origionalX;
		this.y=this.origionalY;
		
		this.imgRocket = new Image();
		this.imgRocket.src = 'gfx/rocket.png'
		this.direction = ''
	}
	draw(display) {
		display.drawImage(this.imgRocket, this.x, this.y)
	}
	move() {
		switch(this.direction) {
			case 'left':
				this.x --;
			break;
			case 'right':
				this.x ++;
			break;
				
		}
	}
	getX1(){
		return this.x - 5;
		
	}
	
	getY1(){
		return this.y;
		
	}
	
	getX2(){
		return this.x + this.width;
		
	}
	
	getY2(){
		return this.y + this.height;
	}
	centre(){
		this.x=this.origionalX;
	}
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