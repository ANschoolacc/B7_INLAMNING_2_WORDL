export default function GameInfo() {
  return (
    <>
      <h2 className="wordleGame__title">Let's play Wordle!</h2>
      <hr className="wordleGame__line" />
      <p className="wordleGame__text">Welcome to Wordle! The premise of this game is "simply" to guess the letters of a randomly generated word. When making a guess, boxes with each guessed letter inside them will appear.
      </p>
      <p className="wordleGame__text">
        If the box is green <span className="wordleGame__textBox wordleGame__textBox--green"></span>: the character you guessed is correct and in the correct place.
        <br />
        If the box is yellow <span className="wordleGame__textBox wordleGame__textBox--yellow"></span>: the character exists in the word but is at the wrong place.
        <br />
        And if the box is red <span className="wordleGame__textBox wordleGame__textBox--red"></span>: the character doesn't exist in the word at all or has already been used in the correct place.
        <br />
        If all the boxes appear green you have won, simple!
      </p>
      <p className="wordleGame__text">
        But before you start. Please choose a difficulty. As you might have considerd, the longer the word is and the amount of unique letters there is, the harder it is to guess the correct word!
      </p>
    </>
  )
}