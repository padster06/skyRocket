class Background {
	constructor() {
		this.x=20;
		this.y=20;
		this.width = 600;
		this.height = 600;
	}
	centreX() {
		return (this.width/2)+(this.x);
	}
	centreY() {
		return (this.height/2)+(this.y);
	}
	getX1(){
		return this.x;
		
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
}