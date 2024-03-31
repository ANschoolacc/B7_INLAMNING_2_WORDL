import { useState } from "react";

export default function LetterInput({ onGuess, maxInput, abort }) {
  const [newGuess, setNewGuess] = useState('');

  return (
    <>
      <form className="guess" action=""
        onSubmit={(e) => {
          e.preventDefault();
          onGuess(newGuess);
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