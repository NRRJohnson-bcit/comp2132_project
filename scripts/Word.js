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
		
		// this.#theWord = word.upper();
		// test word
		this.#theWord = "TEST";
		
		this.#theWordArray = [...this.#theWord];
	}
	
	guessLetter(letter) {
		letter = letter.upper();
		if (!this.isGuessed(letter)) {
			this.#guesses.push(letter);
			// if guessed letter is in word, update correctArray
			if (this.isInWord(letter)) {
				// check each character in theWordArray, and if it matches the letter parameter, 
				// 		add letter to correctArray at that index
				for( let i = 0; index < this.#theWordArray.length(); i++ ){
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
		return this.#guesses.includes(letter.upper());
	}
	
	// checks if the parameter letter is in the word
	isInWord(letter) {
		return this.#theWordArray.includes(letter.upper());
	}
	
	// gets the array that represents the so-far-constructed word
	getCorrectArray() {
		return this.#correctArray;
	}
	
}

