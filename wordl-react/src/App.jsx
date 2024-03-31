import { useState, useEffect } from "react";
import LetterInput from "./components/LetterInput";
import SetDifficulty from "./components/SetDifficulty";
import GuessBoxes from "./components/GuessBoxes";
import SendScore from "./components/SendScore"
import "./scss/app.scss";

function App() {
  const [results, setResults] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState();
  const [guesses, setGuesses] = useState(0);
  const [wordLength, setWordLength] = useState();
  const [highscore, setHighscore] = useState();

  async function handleDifficulty(chosenDifficulty) {
    setStartGame(!startGame)
    setTimer(Date.now())
    setWordLength(chosenDifficulty.chosenLength);
    setHighscore({
      ...highscore,
      length: chosenDifficulty.chosenLength,
      uniqueletters: chosenDifficulty.uniqueLetters ? 'Yes' : 'No',

    })

    fetch("/api/difficulty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenDifficulty),
    });
  }

  async function handleGuess(newGuess) {
    if(!newGuess){
      return
    }
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newGuess }),
    });
    
    const data = await response.json();
    if(!data.length){
      return
    }
    setGuesses(guesses + 1)
    const updatedresults = [
      ...results,
      data
    ]
    setResults(updatedresults)
    if(data.map((letter) => letter.result).every(v => v === 'correct')){
      setHighscore({
        ...highscore,
        word: newGuess,
        time: (Date.now() - timer) / 1000,
        guesses: (guesses + 1), 
      })
      setWin(!win)
    }
  }

  function handleAbort(){
    setStartGame(!startGame)
    setWin(!win)
    setResults([])
    setTimer()
    setGuesses(0)
    setHighscore()
  }

  return (
    <>
    {win && < SendScore highscore={highscore} abort={handleAbort} />}
    <div className="wordlGame">
      <div className="wordlGame__wrapper">
        <h2 className="wordlGame__title">
          {!startGame ? "Choose difficulty!" : "Guess the word!"}
        </h2>
        <hr className="wordlGame__line" />
        < GuessBoxes results={results} />
        {!startGame && < SetDifficulty onChosenDifficulty={handleDifficulty} />}
        {startGame && < LetterInput onGuess={handleGuess} maxInput={wordLength} abort={handleAbort} />}
      </div>
    </div>
    </>
  );
}

export default App;
