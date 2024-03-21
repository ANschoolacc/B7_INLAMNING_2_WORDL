
export default function feedback(guess, answer) {
  let result = [];

  if (!guess || !/^[a-öA-Ö]+$/.test(guess) || typeof guess != "string") {
    return result;
  }
  const guessArr = guess.toUpperCase().split("");
  const answerArr = answer.toUpperCase().split("");

  let guessCount = {};
  let answerCount = {};
  guessArr.forEach((letter) => {guessCount[letter] = (guessCount[letter] || 0) + 1;});
  answerArr.forEach((letter) => {answerCount[letter] = (answerCount[letter] || 0) + 1;});

  for (let i = guessArr.length -1; i >= 0; i--) {
    if (guessArr[i] === answerArr[i]) {
      result.push({
        letter: guessArr[i],
        result: "correct"
      });
      guessCount[guessArr[i]]--;
      answerCount[guessArr[i]]--;
      
    } else if (answerCount[guessArr[i]] > 0) {
      result.push({
        letter: guessArr[i],
        result: "misplaced"
      });
      guessCount[guessArr[i]]--;
      answerCount[guessArr[i]]--;
      
    } else {
      result.push({
        letter: guessArr[i],
        result: "incorrect"
      });
    }
  }
  return result.reverse();
}
