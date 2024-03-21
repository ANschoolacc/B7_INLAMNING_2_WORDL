import { useState } from 'react';
import LetterInput from './components/LetterInput';
import SetDifficulty from './components/SetDifficulty';
import './scss/app.scss'

function App() {
  const [difficulty, setDifficulty] = useState([]);
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  function handleDifficulty (chosenDifficulty){
    setDifficulty(difficulty.push(chosenDifficulty))
    setShowFirst(!showFirst);
    setShowSecond(!showSecond);
    console.log(difficulty)
  }

  return (
    <div className='wordlGame'>
      <div className='wordlGame__wrapper'>
         {showFirst && < SetDifficulty onChosenDifficulty={handleDifficulty}/> }
         {showSecond && <LetterInput />}
      </div>
    </div>
    
  )
}

export default App
