import { useState } from "react";


export default function SendScore({ highscore, abort }) {
  const [posted, setPosted] = useState(false)
  const [player, setPlayer] = useState('');
  const [error, setError] = useState()

  async function handleScore(playerName) {
    setPosted(!posted)
    await fetch("/api/newScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...highscore,
        name: playerName,
      }),
    });
  }

  return (
    <div className="sendScore__filter">
      <div className="sendScore__wrapper">
        {posted && <><h2 className="sendScore__title">Score posted!</h2></>}
        {!posted && <><h2 className="sendScore__title" >You did it!</h2>
          <h2 className="sendScore__title--small">Post you'r score and/or start a new game</h2>
          <hr className="wordlGame__line" />
          <ul className="sendScore__score" >
            <li className="sendScore__scoreItem" >{`Word: 
        ${highscore.word}`}</li>
            <li className="sendScore__scoreItem">{`Length of word: 
        ${highscore.length}`}</li>
            <li className="sendScore__scoreItem">{`Guesses: 
        ${highscore.guesses}`}</li>
            <li className="sendScore__scoreItem">{`Time: 
        ${highscore.time}.sec`}</li>
            <li className="sendScore__scoreItem">{`Only unique letters chosen: ${highscore.uniqueletters}`}</li>
          </ul>
          <form action="" className="sendScore__post" onSubmit={(e) => {
            e.preventDefault();
            if (!player.length) {
              setError('Please insert a name before posting')
              return
            }
            setError()
            handleScore(player)
          }}>
            <input className="sendScore__postInput" placeholder="Input name" type="text" maxLength={10} onChange={(e) => {
              setPlayer(e.target.value)
            }} />
            <button className="sendScore__postSubmit" type="submit">Post Score</button>
          </form></>}
        {error && <p className="error">{error}</p>}
        <a className="sendScore__newGame"
          onClick={(e) => {
            abort();
          }}>New game</a>
      </div>
    </div>
  )
}