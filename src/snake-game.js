var SnakeGame = function (options) {

	//Setting the Width and Height
	var WIDTH = options.width || 800,
		HEIGHT = options.height || 600,
		ELEM = document.getElementById(options.canvas),
		BLOCK_SIZE = options.blockSize || 5,
		SNAKE_SIZE = options.snakeSize || 10;

	var context = ELEM.getContext('2d'),
		snake = [];

	function Coordinate(x, y) {
		if (typeof x === typeof undefined || typeof y === typeof undefined) {
			throw new Error("Both x and y should be passed Coordinate class");
		}
		this.x = x;
		this.y = y;
	}

	function initializeSnake() {
		for (var i = 0; i < SNAKE_SIZE; i++) {
			var c = new Coordinate(i, 0);
			snake.push(c);
		}
	}

	function drawSnake() {

		context.clearRect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = '#fff';
		context.fillRect(0, 0, WIDTH, HEIGHT);

		for (var i = 0; i < snake.length; i++) {
			var c = snake[i]
			context.fillStyle = "#000";
			context.fillRect(c.x * BLOCK_SIZE, c.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	var initCanvas = function () {
		if (ELEM === null) {
			throw new Error("Could not find the target Canvas : " + options.canvas);
		}

		ELEM.style.width = WIDTH + 'px';
		ELEM.style.height = HEIGHT + 'px';
	}

	//Bootstrap Everything
	var init = function () {
		//Initialize Canvas
		initCanvas();
		//Create a snake
		initializeSnake();
		//Draw the snake for the first time
		drawSnake();
	}

	init();
}