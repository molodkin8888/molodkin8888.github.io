	var 
	WIDTH = 700,
	HEIGHT = 600,
	pi = Math.PI,
	UpArrow = 38, //code keyboard
	DownArrow = 40, //code keyboard

	canvas,
	ctx,
	keystate,

	player = {
		x: null,
		y: null,
		width: 20, 
		height: 100,

		update: function() {
			if(keystate[UpArrow]) this.y -= 12; //speed player
			if(keystate[DownArrow]) this.y += 12; //speed player
			this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
		},

		draw: function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}, 

	ai = {
		x: null,
		y: null,
		width: 20,
		height: 100,

		update: function() {
			var position = ball.y - (this.height - ball.side) * 0.5;
			this.y += (position - this.y);
			this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
		},

		draw: function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},

	ball = {
		x: null,
		y: null,
		velosity: null,
		side: 12,
		speed: 15,

		work: function(side) {
			var rand = Math.random();
			this.x = side===1 ? player.x + player.width: ai.x - this.side;
			this.y = (HEIGHT - this.side) * rand;

			var angle = 1;
			this.velosity = {
				x: side*this.speed*Math.cos(angle),
				y: this.speed*Math.sin(angle)
			}
		},

		update: function() {
			this.x += this.velosity.x;
			this.y += this.velosity.y;

			if(0 > this.y || this.y+this.side > HEIGHT) {
				var offset = this.velosity.y < 0 ? 0 - this.y : HEIGHT - (this.y + this.side);
				this.y += 2*offset;
				this.velosity.y *= -1;
			}

			var cross = function(ax, ay, aw, ah, bx, by, bw, bh) {
				return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
			};

			var strip = this.velosity.x < 0 ? player : ai;
			if(cross(strip.x, strip.y, strip.width, strip.height, this.x, this.y, this.side, this.side)
				) {
			this.x = strip===player ? player.x+player.width : ai.x - this.side;
			var n = (this.y+this.side - strip.y)/(strip.height+this.side);
			var reflection = 0.25*pi*(2*n - 1);

			var target = Math.abs(reflection) > 0.2*pi ? 1.5 : 1;
			this.velosity.x = target*(strip===player ? 1 : -1)*this.speed*Math.cos(reflection);
			this.velosity.y = target*this.speed*Math.sin(reflection);
			}
			
			if(1 > this.x+this.side || this.x > WIDTH) {
				this.work(strip===player ? 1 : -1);
			}
		},

		draw: function() {
			ctx.fillRect(this.x, this.y, this.side, this.side);
		}
	};

	function main() {
		canvas = document.createElement("canvas");
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		ctx = canvas.getContext("2d");
		document.body.appendChild(canvas);
		keystate = {};

		document.addEventListener("keydown", function(but) {
			keystate[but.keyCode] = true;
		});

		document.addEventListener("keyup", function(but) {
			delete keystate[but.keyCode];
		});
		init();

		var clamp = function() {
			update();
			draw();
			window.requestAnimationFrame(clamp, canvas);
		};
		window.requestAnimationFrame(clamp, canvas);
	}

	function init() {
		player.x = player.width;
		player.y = (HEIGHT - player.height)/2;
		ai.x = WIDTH - (player.width + ai.width);
		ai.y = (HEIGHT - ai.height)/2;
		ball.work(1);
	}

	function update() {
		ball.update();
		player.update();
		ai.update();
	}

	function draw() {
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.save();
		ctx.fillStyle = "#77b2e5";
		ball.draw();
		player.draw();
		ai.draw();
		//lines center 
		var w = 3;
		var x = (WIDTH - w)*0.5;
		var y = 0;
		var step = HEIGHT/180;
		while(y < HEIGHT) {
			ctx.fillRect(x, y+step*0.25, w, step*0.5);
			y += step;
		}
		ctx.restore();
	}

	main();