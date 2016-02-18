
/**
 * @author Avinash Verma
 *
 * Classic Snake Game, made in Vanilla JS
 *
 * @example N/A
 * @param options ->
 *           width {Integer} : Width of the game
 *			 height {Integer} : Height of the game
 *			 canvas {String} : ID of the canvas
 *			 blockSize {Integer} : Size of the minimum block
 *			 snakeSize {Integer} : Initial size of the snake
 *			 speed {Integer} : Speed of the game
 *			 foodValue {Integer} : Value of a food object when consumed
 */
var SnakeGame = function (options) {

	//Game Constants
	var WIDTH = options.width || 800,
		HEIGHT = options.height || 600,
		ELEM = document.getElementById(options.canvas),
		BLOCK_SIZE = options.blockSize || 10,
		SNAKE_SIZE = options.snakeSize || 10,
		SPEED = options.speed || 10,
		FOOD_VALUE = options.foodValue || 1;

	//Game Variables
	var context = ELEM.getContext('2d'),
		snake = [],
		direction = {current: 'right'},
		interval = 2000 / SPEED,
		food,
		game,
		score_card,
		score = 0;

	/**
	 * @author Avinash Verma
	 *
	 * Coordinate Class
	 *
	 * @example var c = new Coordinate(1, 2); //c -> {x: 1, y: 2}
	 * @param x {Integer} : represents x coordinate
	 * @param y {Integer} : represents y coordinate
	 */
	function Coordinate(x, y) {
		if (typeof x === typeof undefined || typeof y === typeof undefined) {
			throw new Error("Both x and y should be passed Coordinate class");
		}
		this.x = x;
		this.y = y;
	}

	/**
	 * @author Avinash Verma
	 *
	 * Food Class
	 *
	 * @example var c = new Coordinate(1, 2); //c -> {x: 1, y: 2}
	 *          var f = new Food(c, 1)  //f -> {x: 1, y: 2, value: 1}
	 * @param coordinate {Coordinate} : Coordinate Object to determine the spawn position
	 * @param value {Integer} : Food value, gets added to score on consumption
	 */
	function Food(coordinate, value) {
		this.x = coordinate.x;
		this.y = coordinate.y;

		this.value = value;

		this.spawn = function () {
			context.fillStyle = '#000';
			context.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Clears the canvas
	 * Paints it white
	 * Paints the food object
	 *
	 * @example refresh()
	 * @param N/A
	 */
	function refresh() {
		context.clearRect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = '#fff';
		context.fillRect(0, 0, WIDTH, HEIGHT);
		if (food)
			food.spawn();
	}

	/**
	 * @author Avinash Verma
	 *
	 * Creates the snake
	 *
	 * @example initializeSnake() //To be called once per game
	 * @param N/A
	 */
	function initializeSnake() {
		for (var i = 0; i < SNAKE_SIZE; i++) {
			var c = new Coordinate(i, 0);
			snake.push(c);
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Draws the snake for updated positions
	 *
	 * @example drawSnake()
	 * @param N/A
	 */
	function drawSnake() {

		refresh();

		for (var i = 0; i < snake.length; i++) {
			var c = snake[i]
			context.fillStyle = "#000";
			context.strokeRect(c.x * BLOCK_SIZE, c.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

			if(i === snake.length - 1) {    //Paint the head
				context.fillStyle = "red";
				context.fillRect(c.x * BLOCK_SIZE, c.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			}
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Restructures snake to render movement
	 * drawSnake() should be called after this, to paint it in the canvas
	 *
	 * @example move('left')
	 *
	 * @param direction {String} : 'left' / 'right' / 'up' / 'down'
	 */
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

	/**
	 * @author Avinash Verma
	 *
	 * Binds arrow keys to movement of snake
	 *
	 * @example setUpKeyBinding()   //To be called once
	 *
	 * @param N/A
	 */
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

			if (typeof keyMap[e.keyCode] === typeof undefined) {
				return;
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
			if (allow) {
				direction.current = keyMap[e.keyCode];
			}

			if (e.keyCode)
				e.preventDefault();
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Creates new Food object and spawns it randomly
	 *
	 * @example spawnFood()   //To be once when the game starts and each time snake eats food
	 *
	 * @param N/A
	 */
	function spawnFood() {
		var rand_x = Math.round(Math.random() * (WIDTH - BLOCK_SIZE) / BLOCK_SIZE);
		var rand_y = Math.round(Math.random() * (HEIGHT - BLOCK_SIZE) / BLOCK_SIZE);

		var c = new Coordinate(rand_x, rand_y);
		food = new Food(c, FOOD_VALUE);
	}

	/**
	 * @author Avinash Verma
	 *
	 * Checks if the snake reaches the food object
	 *
	 * @example checkFoodCollision()   //To be called on each loop of game
	 *
	 * @param N/A
	 * @returns boolean {Boolean} : true, if collision happens, false otherwise
	 */
	function checkFoodCollision() {
		var head = snake[snake.length - 1];
		return head.x === food.x && head.y === food.y;
	}

	/**
	 * @author Avinash Verma
	 *
	 * Checks if the snake collides with the wall
	 *
	 * @example checkWallCollision()   //To be called on each loop of game
	 *
	 * @param N/A
	 * @returns boolean {Boolean} : true, if collision happens, false otherwise
	 */
	function checkWallCollision() {
		var head = snake[snake.length - 1];
		if (head.x >= WIDTH / BLOCK_SIZE || head.x <= -1 || head.y >= HEIGHT / BLOCK_SIZE || head.y <= -1) {
			gameOver();
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Checks if the snake collides with itself
	 *
	 * @example checkSelfCollision()   //To be called on each loop of game
	 *
	 * @param N/A
	 * @returns boolean {Boolean} : true, if collision happens, false otherwise
	 */
	function checkSelfCollision() {
		var head = snake[0];

		for (var i = 1; i < snake.length; i++) {
			var c = snake[i];
			if (head.x == c.x && head.y == c.y) {
				gameOver();
				return;
			}
		}
	}

	/**
	 * @author Avinash Verma
	 *
	 * Consumes the food object and increments the Snake Length at the tail
	 * The direction of tail is taken into consideration and increment is added
	 * in the same direction
	 *
	 * @example eatFood()   //To be called whenever checkFoodCollision() returns true
	 *
	 * @param N/A
	 */
	function eatFood() {
		var tailDirection;

		var tail = snake[0];
		var tailPredecessor = snake[1];

		if (tail.x === tailPredecessor.x) {      //UP or DOWN
			if (tail.y > tailPredecessor.y) {    //UP
				tailDirection = 'up';
			}
			else {
				tailDirection = 'down';
			}
		}
		else if (tail.y === tailPredecessor.y) {  //RIGHT OR LEFT
			if (tail.x > tailPredecessor.x) {    //LEFT
				tailDirection = 'left';
			}
			else {
				tailDirection = 'right';
			}
		}

		switch (tailDirection) {
			case 'left':
				for (var i = 0; i < food.value; i++) {
					var tail = snake[0];
					var increment = new Coordinate(tail.x + 1, tail.y);
					snake.unshift(increment);
				}
				break;
			case 'right':
				for (var i = 0; i < food.value; i++) {
					var tail = snake[0];
					var increment = new Coordinate(tail.x - 1, tail.y);
					snake.unshift(increment);
				}
				break;
			case 'up':
				for (var i = 0; i < food.value; i++) {
					var tail = snake[0];
					var increment = new Coordinate(tail.x, tail.y + 1);
					snake.unshift(increment);
				}
				break;
			case 'down':
				for (var i = 0; i < food.value; i++) {
					var tail = snake[0];
					var increment = new Coordinate(tail.x, tail.y - 1);
					snake.unshift(increment);
				}
				break;
		}

		//Change score
		updateScore();

		spawnFood();
	}

	/**
	 * @author Avinash Verma
	 *
	 * Sets up the canvas
	 *
	 * @example initCanvas()   //To be called only once
	 *
	 * @param N/A
	 */
	function initCanvas() {
		if (ELEM === null) {
			throw new Error("Could not find the target Canvas : " + options.canvas);
		}

		ELEM.width = WIDTH;
		ELEM.height = HEIGHT;
	}

	/**
	 * @author Avinash Verma
	 *
	 * Sets up the Score Card
	 *
	 * @example initScoreCard()   //To be called only once
	 *
	 * @param N/A
	 */
	function initScoreCard() {
		score_card = document.createElement('div');
		score_card.innerHTML = 'Score : ' + score;
		score_card.style['text-align'] = 'center';
		score_card.style['margin'] = '20px';
		score_card.style['font-family'] = 'monospace';
		score_card.style['font-size'] = '20px';
		score_card.style['color'] = '#fff';
		score_card.style['font-weight'] = 'bold';

		document.body.appendChild(score_card);
	}

	/**
	 * @author Avinash Verma
	 *
	 * Starts the game
	 *
	 * @example startGame()   //To be called only once per game
	 *
	 * @param N/A
	 */
	function startGame() {
		game = setInterval(function () {

			move(direction.current);
			drawSnake();

			var reachedFood = checkFoodCollision();
			if (reachedFood) {
				eatFood();
			}

			checkWallCollision();
			checkSelfCollision();

		}, interval);
	}

	/**
	 * @author Avinash Verma
	 *
	 * Updates Score Card
	 *
	 * @example updateScore()   //To be called whenever the snake eats a food object
	 *
	 * @param N/A
	 */
	function updateScore() {
		score += food.value;
		score_card.innerHTML = 'Score : ' + score;
	}

	/**
	 * @author Avinash Verma
	 *
	 * Ends the game
	 *
	 * @example gameOver()   //To be called whenever either of
	 *                       //checkWallCollision() or checkSelfCollision() returns true
	 *
	 * @param N/A
	 */
	function gameOver() {
		clearInterval(game);
		alert("Game Over !!");
	}

	/**
	 * @author Avinash Verma
	 *
	 * Bootstraps the game
	 *
	 * @example bootstrap()   //To be called once
	 *
	 * @param N/A
	 */
	var bootstrap = function () {
		//Init ScoreCard
		initScoreCard();
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

	bootstrap();
}