/* author: Nicolas Johnson */

/* -- get and store elements -- */

// #region carousel elements
const $carousel = $("#carousel");
const $btnSpin = $("#btn-spin");
const $btnReverse = $("#btn-reverse");
const $btnStop = $("#btn-stop");

// #endregion


// #region pacman elements
const $innerMove = $("#inner-move");

const $pacman = $("#pacman");
const $allControls = $("#controls button");
const $btnW = $("#btn-w");
const $btnA = $("#btn-a");
const $btnS = $("#btn-s");
const $btnD = $("#btn-d");
const $btnX = $("#btn-x");

// #endregion


// handlers & animation checks for carousel
// #region handlers & animation checks
let carouselHandler;
let carouselAnimated = false;
let timeHandler;

// #endregion


// handlers & animation checks for pacman
// #region handlers & animation checks
let pacmanHandler;

// track whether pacman is animated or not
let wakka = false;
// keeps track of movement direction - using W, A, S, D
let moveDir = "D";
// keeps track of image direction
let imgDir = "D";
// track horizontal and vertical position
let xPos = 0;
let yPos = 0;

// #endregion


// other variables
// #region other variables
const imgSrc = "../images/product/bike-";
const imgExt = ".jpg";

let imgNum = 1;

// paths for pacman gifs
const pacmanStaticSrc = "../images/pacman/pac-man-static.gif";
const pacmanMoveSrc = "../images/pacman/pac-man-fast.gif";

// set up variables to hold max dimensions of pacman move area
let maxX;
let maxY;

// #endregion


/* ---- set up carousel listeners ---- */
// #region carousel listeners
$btnSpin.click(spinCarousel);
$btnReverse.click(reverseCarousel);
$btnStop.click(stopCarousel);

// #endregion


// #region carousel functions
// starts the spin forward
function spinCarousel() {
	stopCarousel();
	
	if (!carouselAnimated) {
		carouselAnimated = true;
		carouselHandler = requestAnimationFrame(carouselForward);
	}
}

// starts the reverse spin
function reverseCarousel() {
	stopCarousel();
	
	if (!carouselAnimated) {
		carouselAnimated = true;
		carouselHandler = requestAnimationFrame(carouselReverse);
	}
}

function carouselForward() {
	timeHandler = setTimeout(function() {
		
		if (imgNum == 34) {
			imgNum = 1;
		} else {
			imgNum++;
		}
		let src = imgSrc + imgNum + imgExt;
		
		$carousel.attr("src", src);
		
		carouselHandler = requestAnimationFrame(carouselForward);
	}, 100);
}

function carouselReverse() {
	timeHandler = setTimeout(function() {
		if (imgNum == 1) {
			imgNum = 34;
		} else {
			imgNum--;
		}
		let src = imgSrc + imgNum + imgExt;
		
		$carousel.attr("src", src);
		
		carouselHandler = requestAnimationFrame(carouselReverse);
	}, 100);
}

function stopCarousel() {
	cancelAnimationFrame(carouselHandler);
	clearTimeout(timeHandler);
	carouselAnimated = false;
}

// #endregion



/* ---- set up pacman listeners ---- */
// #region pacman listeners
$btnD.click(moveD);
$btnA.click(moveA);
$btnW.click(moveW);
$btnS.click(moveS);

// listener for keypresses, routes to appropriate move function
$("body").on("keydown", function(e) {
	// if statement based on code for keydown, same as uppercase ASCII code
	//		W = 87, A = 65, S = 83, D = 68, X = 88
	if (e.which == 87) {
		moveW();
	} else if (e.which == 65) {
		moveA();
	} else if (e.which == 83) {
		moveS();
	} else if (e.which == 68)  {
		moveD();
	} else if (e.which == 88) {
		stopMove();
	}
});

$btnX.click(stopMove);

// #endregion


// #region pacman functions to deside which way to move
function moveW() {
	moveDir = "W";
	imgDir = "W";
	changeHightlight();
	pacImgDirection();
	startMove();
}
function moveA() {
	moveDir = "A";
	imgDir = "A";
	changeHightlight();
	pacImgDirection();
	startMove();
}
function moveS() {
	moveDir = "S";
	imgDir = "S";
	changeHightlight();
	pacImgDirection();
	startMove();
}
function moveD() {
	moveDir = "D";
	imgDir = "D";
	changeHightlight();
	pacImgDirection();
	startMove();
}

// #endregion


// #region pacman functions
function startMove() {
	if(!wakka) {
		wakka = true;
		// debugger;
		$pacman.attr("src", pacmanMoveSrc);
		pacmanHandler = requestAnimationFrame(move);
	}
}

function stopMove() {
	cancelAnimationFrame(pacmanHandler);
	$pacman.attr("src", pacmanStaticSrc);
	wakka = false;
	stopHighlight();
}

// changes which button is highlighted
function changeHightlight() {
	$allControls.removeClass("selected-direction");
	if (moveDir == "W") {
		$btnW.addClass("selected-direction");
	} else if (moveDir == "A") {
		$btnA.addClass("selected-direction");
	} else if (moveDir == "S") {
		$btnS.addClass("selected-direction");
	} else if (moveDir == "D") {
		$btnD.addClass("selected-direction");
	}
}

// highlights the X button, even though moveDir hasn't changed
function stopHighlight() {
	$allControls.removeClass("selected-direction");
	$btnX.addClass("selected-direction");
}


//the function that is called with each new frame of the animation
// (adapted from exercise sample code)
function move(){
	
	// strip out "px" from width & height, make into an int
	maxX = parseInt($innerMove.css("width").replace("px", ""));
	maxY = parseInt($innerMove.css("height").replace("px", ""));
	
	if (moveDir === "D") {
		xPos++;
		if(xPos >= maxX) {
			moveDir = "A";
			imgDir = "A";
			pacImgDirection();
		}
	} else if (moveDir === "A") {
		xPos--;
		if(xPos <= 0){
			moveDir = "D";
			imgDir = "D";
			pacImgDirection();
		}
	} else if (moveDir === "W") {
		yPos--;
		if(yPos <= 0){
			moveDir = "S";
			imgDir = "S";
			pacImgDirection();
		}
	} else if (moveDir === "S") {
		yPos++;
		if(yPos >= maxY){
			moveDir = "W";
			imgDir = "W";
			pacImgDirection();
		}
	}
	console.log(xPos + " " + yPos);
	$pacman.css("left", xPos);
	$pacman.css("top", yPos);
	//request the next frame in the animation
	pacmanHandler = requestAnimationFrame(move);
}

function pacImgDirection() {
	if (imgDir === "D") {
		$pacman.css("transform", "rotate(0)");
		$pacman.css("transform", "scaleX(1)");
	} else if (imgDir === "A") {
		$pacman.css("transform", "rotate(0)");
		$pacman.css("transform", "scaleX(-1)");
	} else if (imgDir === "W") {
		$pacman.css("transform", "scaleY(1)");
		$pacman.css("transform", "rotate(270deg)");
	} else if (imgDir === "S") {
		$pacman.css("transform", "scaleY(-1)");
		$pacman.css("transform", "rotate(90deg)");
	}
}

// #endregion


