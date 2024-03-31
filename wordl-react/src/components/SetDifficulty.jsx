import { useState } from "react";

export default function SetDifficulty({ onChosenDifficulty }) {
  const [length, setLength] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  }

  return (

    <>
      <form className="difficulty"
        onSubmit={(e) => {
          e.preventDefault();
          if (length < 3) {
            return
          } else if (length > 8) {
            return
          }
          const difficulty = {
            chosenLength: length,
            uniqueLetters: isChecked
          }
          onChosenDifficulty(difficulty)
        }}>
        <label className="difficulty__info" >Choose length of word:</label>
        <input className="difficulty__setLength" id="setLength" type="text" value={length} maxLength={2}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setLength(Number(numericValue))
          }}></input>
        <hr className="difficulty__line" />
        <label className="difficulty__info">Set if all letters should be unique:</label>

        <input className="difficulty__setUnique" id="setUnique" type="checkbox" value={isChecked}
          onChange={checkHandler} ></input>

        <button className="difficulty__start gameButton" type="submit">START</button>
      </form>
    </>

  )
}