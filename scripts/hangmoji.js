/* author: Nicolas Johnson */

/* -- get and store elements -- */
const $temp = $("#emoji-display");

// #region - game display elements

const $wordDisplay = $("#word-display");


// #region


// #region - letter elements
// const $carousel = $("#carousel");
const $letterInput = $("#letter-input");
const $guessBtn = $("#submit");
const $invalidLetter = $("#invalid-letter");

const $allLetters = $("#letter-display li");


// #endregion

// other variables
// #region other variables

const hangWord = new Word("TEST");

html = "";

// #endregion



// #region -- initial setup

puzzleBlanks();


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
		
		console.log(hangWord.getCorrectArray());
		
		if (hangWord.isInWord(letter)) {
			console.log(letter + " is in word");
			
			// if the guess is correct, update the guessed letters...
			hangWord.guessLetter(letter);
			// ... and update the word display
			puzzleBlanks();
		} else {
			// TODO -- handle a wrong guess										-- TODO
			
			
			
		}
		
		
		
		
	}
	
	
}


function getLetter() {
	let letter = "TEST";
	
	console.log(letter);
}

// #endregion


// #region -- functions to set up and update puzzle

function puzzleBlanks() {
	html = "";
	let correctArray = hangWord.getCorrectArray();
	// console.log(correctArray);
	
	for( let i = 0; i < correctArray.length; i++ ){
		// if there is a letter in this index of the array, display it
		if (correctArray[i] != null) {
			html += `<li>${correctArray[i]}</li>`;
		} else {
			// otherwise, display a blank indicator
			html += `<li>__</li>`;
		}
	}
	
	// console.log(html);
	$wordDisplay.html(html);
}




// #endregion

// #region -- functions to update displayed letters

function greyOutLetter() {
	// $allLetters
	
	
	
}



// #endregion


