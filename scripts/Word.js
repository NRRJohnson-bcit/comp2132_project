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
		
		if (!this.isGuessed(letter)) {
			
		} else {
			
		}
		
	}
	
	
	isGuessed(letter) {
		return this.#guesses.includes(letter.upper());
	}
	
	
	isInWord(letter) {
		return this.#theWordArray.includes(letter.upper());
	}
	
}

