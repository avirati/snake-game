var SnakeGame = function (options) {

	//Setting the Width and Height
	var WIDTH = options.width || 800;
	var HEIGHT = options.height || 600;
	var ELEM = document.getElementById(options.canvas);

	var initCanvas = function () {
		if(ELEM === null) {
			throw new Error("Could not find the target Canvas : " + options.canvas);
		}

		ELEM.style.width = WIDTH + 'px';
		ELEM.style.height = HEIGHT + 'px';
	}

	//Bootstrap Everything
	var init = function () {
		//Initialize Canvas
		initCanvas();
	}

	init();
}