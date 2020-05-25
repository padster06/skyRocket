class Pickup {
	constructor() {
		this.x=Math.floor(Math.random()*(border.width-20))+20;
		this.y = Math.floor(Math.random()*150)+500;
		this.imgStar=new Image();
		this.imgStar.src = 'gfx/star.png';
		this.width = 30;
		this.height = 30;
		this.show = true;
	}
	draw(display) {
		if(this.show == true) {
			display.drawImage(this.imgStar, this.x, this.y);
		}
	}
	move() {
		this.y+=2
		if(this.y > 1000) {
			this.y = Math.floor(Math.random()*-150)-500;
			this.x=Math.floor(Math.random()*(border.width-20))+20;
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
	doesCollideWith(boxToCheck){
		if (this.show == true) {
			var buffer=false;
			//Has this boxes right side made contact with another boxes left side
			if(this.getX2()>=boxToCheck.getX1() && this.getX2()<=boxToCheck.getX2() && this.getY1()<=boxToCheck.getY2() && this.getY2()>=boxToCheck.getY1()){
				//Yes
				buffer=true;
				this.show = false;
			}
			//Has this boxes left side made contact with another boxes right side
			if(this.getX1()<=boxToCheck.getX2() && this.getX1()>=boxToCheck.getX1() && this.getY1()<=boxToCheck.getY2() && this.getY2()>=boxToCheck.getY1()){
				//Yes
				buffer=true;
				this.show = false;
			}
			//Has this boxes top side made contact with another boxes bottom side
			if(this.getX1()<=boxToCheck.getX2() && this.getX2()>=boxToCheck.getX1() && this.getY1()<=boxToCheck.getY2() && this.getY1()>=boxToCheck.getY1()){
				//Yes
				buffer=true;
				this.show = false;
			}
			//Has this boxes bottom side made contact with another top bottom side
			if(this.getX1()<=boxToCheck.getX2() && this.getX2()>=boxToCheck.getX1() && this.getY2()>=boxToCheck.getY1() && this.getY2()<=boxToCheck.getY2()){
				//Yes
				buffer=true;
				this.show = false; 
			}
		}
		return buffer;
	}
	showStar() {
		if(this.y > 900) {
			this.show = true;
		}
	}
}