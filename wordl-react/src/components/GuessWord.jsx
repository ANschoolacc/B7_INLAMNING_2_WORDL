import { useState } from "react";
import GuessBoxes from "./GuessBoxes";

export default function GuessWord({ onGuess, results, maxInput, error, abort }) {
  const [newGuess, setNewGuess] = useState('');

  return (
    <>
      < GuessBoxes results={results} />
      <form className="guess" action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (!newGuess) {
            error('You have to type something!')
            return
          } else if (!/^[a-zA-Z]+$/.test(newGuess)) {
            error('The guess has to be letters only!')
            return
          }
          onGuess(newGuess.toUpperCase());
        }
        }>
        <input className='guess__letterInput' maxLength={maxInput} type="text"
          onChange={(e) => {
            setNewGuess(e.target.value)
          }}></input>
        <button className="guess__submit gameButton" type="submit">Make guess!</button>
      </form>
      <a className="guess__giveUp"
        onClick={(e) => {
          abort();
        }}>Give up</a>
    </>
  );
}