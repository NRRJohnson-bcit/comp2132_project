/* author: Nicolas Johnson */

/* -- get and store elements -- */
const $temp = $("#emoji-display");


// #region - letter elements
// const $carousel = $("#carousel");
const $letterInput = $("#letter-input");
const $guessBtn = $("#submit");
const $invalidLetter = $("#invalid-letter");

const $allLetters = $("#letter-display li");


// #endregion




// #region - handlers for letter clicking

// $allLetters.click(getLetter);

$guessBtn.click(submitLetter);

function submitLetter(e) {
	e.preventDefault();
	if (!$invalidLetter.hasClass("hide")) {
		$invalidLetter.addClass("hide");
	}
	
	// console.log("CLICK");
	
	letter = $letterInput.val();
	// console.log(letter);
	
	// const regExLetter = "[a-zA-Z]";
	let regExLetter = RegExp("[a-zA-Z]");
	
	if (!regExLetter.test(letter)) {
		console.log("NOT A LETTER");
		$invalidLetter.removeClass("hide");
	} else {
		// TODO -- handle the guessing											-- TODO
		
		
		
	}
	
	
}



function getLetter() {
	let letter = "TEST";
	
	console.log(letter);
}

// #endregion
