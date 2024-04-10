import { useState, useEffect, useRef } from "react";
import GuessWord from "./components/GuessWord";
import SetDifficulty from "./components/SetDifficulty";
import SendScore from "./components/SendScore";
import GameInfo from "./components/GameInfo";
import "./scss/app.scss";

function App() {
  const [results, setResults] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [showError, setShowError] = useState(false);
  const [wordLength, setWordLength] = useState();
  const [score, setScore] = useState()
  const [errorMessage, setErrorMessage] = useState();
  const [gameId, setGameId] = useState();
  const timerId = useRef(null);

  useEffect(() => {
    if (showError) {
      timerId.current = setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
    return () => {
      clearTimeout(timerId.current)
    };
  }, [showError])

  async function handleStartGame(chosenDifficulty) {
    const response = await fetch("/api/new_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenDifficulty),
    });

    if(response.ok){
    setStartGame(!startGame);
    setWordLength(chosenDifficulty.length);
    const id = await response.json();
    setGameId(id);
    }else {
      handleError('No word found')
      throw new Error(`Something went wrong with the request. Error code: ${response.status}`);
    }
  }

  async function handleGuess(newGuess) {
    if (!newGuess) {
      return
    }

    const response = await fetch(`/api/${gameId}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newGuess }),
    });

    if(response.ok){
    const data = await response.json();

    if (!data[0].length) {
      return
    }

    const updatedresults = [
      ...results,
      data[0]
    ]

    setResults(updatedresults)

    if (data[1]) {
      setScore(data[1])
      setWin(!win)
    }
  }else {
    handleError('Something went wrong');
    throw new Error(`Something went wrong with the request. Error code: ${response.status}`);
  }
  }

  async function handleScore(playerName) {
    const response = await fetch(`/api/${gameId}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerName }),
    });
    if(!response.ok){
      throw new Error(`Something went wrong with the request. Error code: ${response.status}`);
    }
  }

  function handleAbort() {
    setStartGame(!startGame)
    setWin(false)
    setResults([])
    setScore();
    setGameId();
  }

  function handleError(message) {
    setErrorMessage(message)
    setShowError(true)
  }

  return (
    <>
      <div className="wordleGame">
        <div className="wordleGame__wrapper">
        {win && < SendScore onPostScore={handleScore} score={score} abort={handleAbort} error={handleError} />}
          {!startGame && < GameInfo />}
          <h2 className="wordleGame__title">
            {!startGame ? "Choose difficulty!" : "Guess the word!"}
          </h2>
          <hr className="wordleGame__line" />
          {!startGame && < SetDifficulty onStartGame={handleStartGame} error={handleError} />}
          {startGame && < GuessWord onGuess={handleGuess} maxInput={wordLength} abort={handleAbort} results={results} error={handleError} />}
          {showError && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
