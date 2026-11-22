/* author: Nicolas Johnson */

/* -- get and store elements -- */
const $temp = $("#emoji-display");

// #region -- game display elements --
const $emojiDisplay = $("#emoji-display");
const $wordDisplay = $("#word-display");

const $congratsMsg = $("#congrats-msg");

const $hintClick = $("#hint-click");
const $hintDisplay = $("#hint-display");

// message for exception
const $exceptionMsg = $("#exception-msg");

// #endregion


// #region -- letter elements --
// const $carousel = $("#carousel");
const $letterInput = $("#letter-input");
const $guessBtn = $("#submit");
// messages under letter guess input
const $invalidLetter = $("#invalid-letter");
const $alreadyGuessed = $("#already-guessed");
const $correctLetter = $("#correct-letter");
const $incorrectLetter = $("#incorrect-letter");
const $gameOver = $("#game-over");

const $allLetters = $("#letter-display li");

// #endregion

const $reset = $("#reset");

// other variables
// #region -- other variables --

const imgPath = "../images/";
const emojiArray = ["1F603", "1F605", "1F615", "1F610", "1F61F", "1F62C", "1F627", "1F62D"];
const imgExt = ".svg";

let emojiIndex = 0;

// let hangWord = new Word("TESTING");
// let hangHint = "This is a hint!";

let hangWord;
let hangHint = "";

html = "";

// #endregion



// #region -- initial setup --

// setting up puzzle blanks, hint, and starting emoji all handled in getWord()
getWord();
// puzzleBlanks();
// setHint();
// updateEmoji();

// #endregion



// #region -- handlers for letter clicking --

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
			
			if (hangWord.guessLetter(letter)) {
				$correctLetter.removeClass("hide");
				
				// if the guess is correct, update the word display
				puzzleBlanks();
				
				// if the word is fully guessed, congratulate the user
				if (hangWord.isComplete()) {
					$emojiDisplay.attr("src", imgPath + "1F601" + imgExt);
					$congratsMsg.removeClass("hide");
					disableGuessing();
				}
			} else {
				emojiIndex++;
				updateEmoji();
				
				if (emojiIndex < emojiArray.length - 1) {
					$incorrectLetter.removeClass("hide");
				} else {
					$gameOver.removeClass("hide");
					disableGuessing();
				}
				
			}
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


// #region -- handler for hint display --
$hintClick.click(showHideHint);

function showHideHint() {
	if ($hintDisplay.hasClass("hide")) {
		$hintDisplay.removeClass("hide");
	} else {
		$hintDisplay.addClass("hide");
	}
}

// #endregion


// #region -- set up & update puzzle --

function updateEmoji() {
	$emojiDisplay.attr("src", imgPath + emojiArray[emojiIndex] + imgExt);
}

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

function setHint() {
	$hintDisplay.html(hangHint);
}


function resetPuzzle() {
	hideMessages();
	if (!$congratsMsg.hasClass("hide")) {
		$congratsMsg.addClass("hide");
	}
	$allLetters.removeClass("letter-selected");
	$letterInput.val("");
	
	emojiIndex = 0;
	getWord();
	enableGuessing();
}


function disableGuessing() {
	$guessBtn.prop("disabled", true);
	$letterInput.prop("disabled", true);
	$letterInput.val("");
}

function enableGuessing() {
	$guessBtn.prop("disabled", false);
	$letterInput.prop("disabled", false);
}


// #endregion


// #region -- update displayed letters --

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
	if (!$gameOver.hasClass("hide")) {
		$gameOver.addClass("hide");
	}
}




// #endregion


// #region -- JSON fetch - get word for puzzle --

function getWord() {
	// hide the exception message, if necessary
	if (!$exceptionMsg.hasClass("hide")) {
		$exceptionMsg.addClass("hide");
	}
	
	const fetchLocation = "https://randomlexicon.com/api/random-definition?lang=en&maxLen=8";
	// const fetchLocation = "https://randomlexicon.com/api/words/ox-eyed";
	
	fetch(fetchLocation)
		.then(function(response) {
			if(response.ok){
				return response.json();
			}else{
				console.log("Network error: fetch failed");
			}    
		})
		.then(function(data) {
			// handle the API data
			console.log(data.word);
			console.log(data.definition);
			
			hangWord = new Word(data.word);
			hangHint = data.definition;
			
			puzzleBlanks();
			setHint();
			updateEmoji();
			
		})
		.catch(function(error) {
			// handle problems
			
			// make the emoji cry
			emojiIndex = 7;
			updateEmoji();
			
			// let the user know something's happened
			$exceptionMsg.removeClass("hide");
		});
	
	
}



// #endregion

