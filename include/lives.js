class Lives {
	constructor(border){
		this.width = 140;
		this.height = 53;
		this.x = border.width + 40;
		this.y = 20;
		this.lives = 3;
		this.imune = false;
		this.heart3 = new Image();
		this.heart3.src = 'gfx/heart3.png';
		this.heart2 = new Image();
		this.heart2.src = 'gfx/heart2.png';
		this.heart1 = new Image();
		this.heart1.src = 'gfx/heart1.png';
		this.heart0 = new Image();
		this.heart0.src = 'gfx/heart0.png';
	}
	takeLife(playing) {
		if (this.imune == false) {
			this.lives--;
		}
		if(this.lives < 1) {
			this.die(playing);
		}
	}		

	draw(display) {
		switch(this.lives) {
			case 3:
			display.drawImage(this.heart3, this.x, this.y);
			break;
			case 2:
			display.drawImage(this.heart2, this.x, this.y);
			break;
			case 1:
			display.drawImage(this.heart1, this.x, this.y);
			break;
		}
		if(this.lives<1) {
			display.drawImage(this.heart0, this.x, this.y);
		}
	}
	die(playing) {
		if (playing == true) {
			playing = false;
		}
	}

}