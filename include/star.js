class Star {
	constructor(border) {
		this.speed = 2;
		this.x = Math.floor(Math.random()*border.width)+border.x;
		this.y = Math.floor(Math.random()*-500);
		this.width = 2;
		this.height = this.width;
	}	
	//make star move to top of screen when function called 
	move(tick, speed) {
		this.y+=(tick*speed);
		if (this.y > 600) {
			this.y = Math.floor(Math.random()*-500);
			this.x = Math.floor(Math.random()*border.width)+border.x;
		}
	}
	show() {
		display.fillStyle = '#fff'
		display.fillRect(this.x, this.y, this.width, this.height);
	}
	
}