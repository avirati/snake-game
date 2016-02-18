var SnakeGame = function (options) {

	//Setting the Width and Height
	var WIDTH = options.width || 800,
		HEIGHT = options.height || 600,
		ELEM = document.getElementById(options.canvas),
		BLOCK_SIZE = options.blockSize || 10,
		SNAKE_SIZE = options.snakeSize || 10,
		SPEED = options.speed || 10;

	var context = ELEM.getContext('2d'),
		snake = [],
		direction = { current: 'right'},
		interval = 2000 / SPEED,
		food;

	function Coordinate(x, y) {
		if (typeof x === typeof undefined || typeof y === typeof undefined) {
			throw new Error("Both x and y should be passed Coordinate class");
		}
		this.x = x;
		this.y = y;
	}

	function Food (coordinate, value) {
		this.x = coordinate.x;
		this.y = coordinate.y;

		this.value = value;
		
		this.spawn = function () {
			context.fillStyle = '#000';
			context.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	function refresh() {
		context.clearRect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = '#fff';
		context.fillRect(0, 0, WIDTH, HEIGHT);
		if(food)
			food.spawn();
	}

	function initializeSnake() {
		for (var i = 0; i < SNAKE_SIZE; i++) {
			var c = new Coordinate(i, 0);
			snake.push(c);
		}
	}

	function drawSnake() {

		refresh();

		for (var i = 0; i < snake.length; i++) {
			var c = snake[i]
			context.fillStyle = "#000";
			context.fillRect(c.x * BLOCK_SIZE, c.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	function move(direction) {
		var tail = snake.shift();
		var head = snake[snake.length - 1];
		switch (direction) {
			case 'right':
				tail.x = head.x + 1;
				tail.y = head.y;
				snake.push(tail);
				break;
			case 'down':
				tail.x = head.x;
				tail.y = head.y + 1;
				snake.push(tail);
				break;
			case 'left':
				tail.x = head.x - 1;
				tail.y = head.y;
				snake.push(tail);
				break;
			case 'up':
				tail.x = head.x;
				tail.y = head.y - 1;
				snake.push(tail);
				break;
		}
	}

	function setUpKeyBinding() {
		document.onkeydown = function (e) {
			e = e || window.event;

			var allow = true;
			var keyMap = {
				38: 'up',
				40: 'down',
				37: 'left',
				39: 'right'
			}
			switch (e.keyCode) {
				case 38 :   //UP
					allow = direction.current !== 'down';
					break;
				case 40 :   //DOWN
					allow = direction.current !== 'up';
					break;
				case 37 :   //LEFT
					allow = direction.current !== 'right';
					break;
				case 39 :   //RIGHT
					allow = direction.current !== 'left';
					break;
			}
			if(allow) {
				direction.current = keyMap[e.keyCode];
			}

			if(e.keyCode)
				e.preventDefault();
		}
	}

	function spawnFood() {
		var rand_x = Math.round(Math.random() * (WIDTH - BLOCK_SIZE) / BLOCK_SIZE);
		var rand_y = Math.round(Math.random() * (HEIGHT - BLOCK_SIZE) / BLOCK_SIZE);

		var c = new Coordinate(rand_x, rand_y);
		food = new Food(c, 1);
	}

	var initCanvas = function () {
		if (ELEM === null) {
			throw new Error("Could not find the target Canvas : " + options.canvas);
		}

		ELEM.width = WIDTH;
		ELEM.height = HEIGHT
	}

	function startGame() {
		setInterval(function () {
			move(direction.current);
			drawSnake();
		}, interval);
	}

	//Bootstrap Everything
	var init = function () {
		//Initialize Canvas
		initCanvas();
		//Create a snake
		initializeSnake();
		//Draw the snake for the first time
		drawSnake();
		//Setup key bindings
		setUpKeyBinding();
		//Start the game
		startGame();
		//Spawn a food item
		spawnFood();
	}

	init();
}