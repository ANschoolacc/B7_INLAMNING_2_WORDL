import { useState } from "react";
import LetterInput from "./components/LetterInput";
import SetDifficulty from "./components/SetDifficulty";
import GuessBoxes from "./components/GuessBoxes";
import "./scss/app.scss";

function App() {
  const [guess, setGuess] = useState("");
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  async function handleDifficulty(chosenDifficulty) {
    setShowFirst(!showFirst);
    setShowSecond(!showSecond);

    fetch("/api/difficulty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenDifficulty),
    });
  }

  function handleGuess(newGuess) {
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newGuess }),
    });
  }

  return (
    <div className="wordlGame">
      <div className="wordlGame__wrapper">
        <h2 className="wordlGame__title">
          {showFirst == true ? "Choose difficulty!" : "Guess the word!"}
        </h2>
        < GuessBoxes guess={guess} />
        {showFirst && < SetDifficulty onChosenDifficulty={handleDifficulty} />}
        {showSecond && < LetterInput onGuess={handleGuess} />}
      </div>
    </div>
  );
}

export default App;
