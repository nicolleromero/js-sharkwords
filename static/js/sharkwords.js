
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  let letters = word.split('')
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    $('#word-container').append(`<div class="letter-box ${letter}"></div>`);
  }

};


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  let letters = ALPHABET.split('')
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    $('#letter-buttons').append(`<button>${letter}</button>`);
  }
};


// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  // const button = $(buttonEl);

  $(buttonEl).attr('disabled', true);
};


// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {

  return $(`div.${letter}`)[0] !== undefined;

};


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {

  $(`div.${letter}`).html(letter);

};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {

  numWrong += 1;

  if (numWrong < 5) {
    $(`#shark-img img`).attr('src', `/static/images/guess${numWrong}.png`);
  }
  if (numWrong === 5) {
    $(`#shark-img img`).attr('src', `/static/images/guess${numWrong}.png`);
    $('button').attr('disabled', true);
    $('#play-again').css('display', '');
  }
};


// Reset game state. Called before restarting the game.
//
const resetGame = () => {

  numWrong = 0;
  $(`#shark-img img`).attr('src', `/static/images/guess${numWrong}.png`);

  $('#play-again').css('display', 'none');

  for (let char of $('#word-container').children()) {
    char.remove();
  }

  for (let char of $('#letter-buttons').children()) {
    char.remove();
  }

};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {

    const clickedBtn = $(evt.target);


    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();


    if (isLetterInWord(letter)) {
      console.log("TRUE");
      handleCorrectGuess(letter);
      console.log(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
