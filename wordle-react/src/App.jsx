import { useState, useEffect, useRef } from "react";
import GuessWord from "./components/GuessWord";
import SetDifficulty from "./components/SetDifficulty";
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
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const timerId = useRef(null)

  useEffect(() => {
  if(showError){

    timerId.current = setTimeout(() => {
      setShowError(false)
  }, 3000)
  }
  return () => {
    clearTimeout(timerId.current)
  };
}, [showError])

  async function handleDifficulty(chosenDifficulty) {
    setStartGame(!startGame)
    setTimer(Date.now())
    setWordLength(chosenDifficulty.length);
    setHighscore({
      ...highscore,
      length: chosenDifficulty.length,
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
    if (!newGuess) {
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
    if (!data.length) {
      return
    }
    setGuesses(guesses + 1)
    const updatedresults = [
      ...results,
      data
    ]
    setResults(updatedresults)
    if (data.map((letter) => letter.result).every(v => v === 'correct')) {
      setHighscore({
        ...highscore,
        word: newGuess,
        time: (Date.now() - timer) / 1000,
        guesses: (guesses + 1),
      })
      setWin(!win)
    }
  }

  function handleAbort() {
    setStartGame(!startGame)
    setWin(false)
    setResults([])
    setTimer()
    setGuesses(0)
    setHighscore()
  }

  function handleError(message) {
    setErrorMessage(message)
    setShowError(true)
  }

  return (
    <>
      {win && < SendScore highscore={highscore} abort={handleAbort} error={handleError} />}
      <div className="wordlGame">
        <div className="wordlGame__wrapper">
          <h2 className="wordlGame__title">
            {!startGame ? "Choose difficulty!" : "Guess the word!"}
          </h2>
          <hr className="wordlGame__line" />
          {!startGame && < SetDifficulty onChosenDifficulty={handleDifficulty} error={handleError} />}
          {startGame && < GuessWord onGuess={handleGuess} maxInput={wordLength} abort={handleAbort} results={results} error={handleError} />}
          {showError && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
