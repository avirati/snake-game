var SnakeGame = function (options) {

	//Setting the Width and Height
	var WIDTH = options.width || 800;
	var HEIGHT = options.height || 600;
	var ELEM = document.getElementById(options.canvas);

	var context = ELEM.getContext('2d');

	var initCanvas = function () {
		if(ELEM === null) {
			throw new Error("Could not find the target Canvas : " + options.canvas);
		}

		ELEM.style.width = WIDTH + 'px';
		ELEM.style.height = HEIGHT + 'px';

		context.fillStyle = '#fff';
		context.fillRect(0, 0, WIDTH, HEIGHT);
	}

	//Bootstrap Everything
	var init = function () {
		//Initialize Canvas
		initCanvas();
	}

	init();
}