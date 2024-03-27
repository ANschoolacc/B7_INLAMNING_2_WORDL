import { useState } from "react";

export default function LetterInput({ onGuess }) {
  const [newGuess, setNewGuess] = useState('');

  return (
    <>
    <form className="guess" action="" onSubmit={(e) => {
      e.preventDefault();
      onGuess(newGuess)
    }
    }>
      <input className='guess__letterInput' type="text" onChange={(e) => {
        setNewGuess(e.target.value)
      }}></input>
    <button className="guess__submit">Make guess!</button>
    </form>
    <a href="/">Give up</a>
    </>
  );
}