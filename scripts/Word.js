/* author: Nicolas Johnson */

class Word {
	
	#theWord;
	#theWordArray;
	
	#guesses;
	#correctArray;
	
	constructor(word) {
		// #guesses starts as an empty array
		this.#guesses = [];
		this.#correctArray = [];
		
		this.#theWord = word.toUpperCase();
		// test word
		// this.#theWord = "TESTING";
		
		this.#theWordArray = [...this.#theWord];
		// initialize correctArray with a length so it can be use as a template for the blank puzzle
		this.#correctArray.length = this.#theWordArray.length;
	}
	
	guessLetter(letter) {
		letter = letter.toUpperCase();
		
		if (!this.isGuessed(letter)) {
			this.#guesses.push(letter);
			
			// if guessed letter is in word, update correctArray
			if (this.isInWord(letter)) {
				// check each character in theWordArray, and if it matches the letter parameter, 
				// 		add letter to correctArray at that index
				for( let i = 0; i < this.#theWordArray.length; i++ ){
					if (this.#theWordArray[i] == letter) {
						this.#correctArray[i] = letter;
					}
				}
				return true;
			} else {
				return false;
			}
		} else {
			// validation should have been done already
			// -- returning false is just the safe fail state
			return false;
		}
	}
	
	// checks if the parameter letter has already been guessed
	isGuessed(letter) {
		return this.#guesses.includes(letter.toUpperCase());
	}
	
	// checks if the parameter letter is in the word
	isInWord(letter) {
		return this.#theWordArray.includes(letter.toUpperCase());
	}
	
	// gets the array that represents the so-far-constructed word
	getCorrectArray() {
		return this.#correctArray;
	}
	
	// gets the array of letters that have already been guessed
	getGuesses() {
		return this.#guesses;
	}
	
}

