
export default function GuessBoxes({ results }) {

  return (
    <div className="result">
      {results.map((word, index) => {
        return (<ul className="result__word" key={index}>
          {word.map((letter, index) => {
            return (<li className={`result__letter result__letter--${letter.result}`} key={index}>{letter.letter}</li>)
          })}
        </ul>)
      })}
    </div>
  )
}//