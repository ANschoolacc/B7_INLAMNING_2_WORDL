import { useState } from "react";

export default function SetDifficulty({ onChosenDifficulty }){
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  }
  const [length, setLength] = useState('')
  return(
    
    <>
    <h2 className="wordlGame__title">Choose difficulty</h2>
      <form className="difficulty" onSubmit={(e) => {
        e.preventDefault();
        
        const difficulty = {
          chosenLength: length,
          uniqueLetters: isChecked
        }

        onChosenDifficulty(difficulty)
      }}>
        <label className="difficulty__info" >Choose length of word:</label>
        <hr className="difficulty__line" />
        <input className="difficulty__setLength" id="setLength" type="text" inputMode="numeric" value={length} min={0} maxLength={2} onChange={(e) => {
          setLength(e.target.value)
        }}></input>
        <label className="difficulty__info">Set if all letters should be unique:</label>
        <hr className="difficulty__line" />
        <input className="difficulty__setUnique" id="setUnique"  type="checkbox" value={isChecked} onChange={checkHandler} ></input>
        <button type="submit">START</button>
      </form>
      </>
    
  )
}