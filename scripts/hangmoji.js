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
// messages under letter guess input
const $invalidLetter = $("#invalid-letter");
const $alreadyGuessed = $("#already-guessed");
const $correctLetter = $("#correct-letter");
const $incorrectLetter = $("#incorrect-letter");

const $allLetters = $("#letter-display li");


// #endregion

const $reset = $("#reset");

// other variables
// #region other variables

let hangWord = new Word("TEST");

html = "";

// #endregion



// #region -- initial setup

puzzleBlanks();


// #endregion



// #region - handlers for letter clicking

// $allLetters.click(getLetter);

$guessBtn.click(submitLetter);
$reset.click(resetPuzzle);

function submitLetter(e) {
	e.preventDefault();
	hideMessages();
	
	// console.log("CLICK");
	
	letter = $letterInput.val();
	// console.log(letter);
	
	// const regExLetter = "[a-zA-Z]";
	let regExLetter = RegExp("[a-zA-Z]");
	
	if (!regExLetter.test(letter)) {
		// console.log("NOT A LETTER");
		$invalidLetter.removeClass("hide");
	} else {
		
		// check if letter already guessed
		if (hangWord.isGuessed(letter)) {
			$alreadyGuessed.removeClass("hide");
		} else {
			// grey out just-guessed letter
			greyOutLetter(letter);
			
			// TODO -- handle the guessing											-- TODO
			
			if (hangWord.guessLetter(letter)) {
				console.log(letter + " is in word");
				$correctLetter.removeClass("hide");
				
				// if the guess is correct, update the word display
				puzzleBlanks();
			} else {
				// TODO -- handle a wrong guess										-- TODO
				$incorrectLetter.removeClass("hide");
				
				
			}
			
			
			// console.log(hangWord.getCorrectArray());
			// console.log(hangWord.getGuesses());
			
			
		}
		
	}
	
	
	// set focus on text box, and select the text in it
	$letterInput.focus();
	$letterInput.select();
	
	
}


function getLetter() {
	let letter = "TEST";
	
	console.log(letter);
}

// #endregion


// #region -- set up & update puzzle

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


function resetPuzzle() {
	hideMessages();
	$allLetters.removeClass("letter-selected");
	$letterInput.val("");
	
	hangWord = new Word("TEST");
	
	puzzleBlanks();
}




// #endregion


// #region -- update displayed letters

function greyOutLetter(letter) {
	// console.log($allLetters);
	
	letter = letter.toUpperCase();
	
	$allLetters.each(function(li) {
		let char = $(this).html();
		
		// console.log(char);
		
		if (char == letter && !$(this).hasClass("letter-selected")) {
			$(this).addClass("letter-selected");
			// console.log("adding class");
		}
		
	});
	
}

// hide the messages under letter guess input
function hideMessages() {
	if (!$invalidLetter.hasClass("hide")) {
		$invalidLetter.addClass("hide");
	}
	if (!$alreadyGuessed.hasClass("hide")) {
		$alreadyGuessed.addClass("hide");
	}
	if (!$correctLetter.hasClass("hide")) {
		$correctLetter.addClass("hide");
	}
	if (!$incorrectLetter.hasClass("hide")) {
		$incorrectLetter.addClass("hide");
	}
}




// #endregion


