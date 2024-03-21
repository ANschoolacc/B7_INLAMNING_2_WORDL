
export default function LetterInput() {

  return (
    <>
    <h2 className="wordlGame__title">Guess the word!</h2>
    <form className="guess" action="">
      <div className='guess__letterBox'>
    <input className='guess__letterInput' type="text" maxLength={1} placeholder='?'></input>
    <input className='guess__letterInput' type="text" maxLength={1} placeholder='?'></input>
    <input className='guess__letterInput' type="text" maxLength={1} placeholder='?'></input>
    <input className='guess__letterInput' type="text" maxLength={1} placeholder='?'></input>
    </div>
    <button className="guess__submit">Make guess!</button>
    </form>
    </>
  );
}