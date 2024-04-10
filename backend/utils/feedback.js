
export default function feedback(guess, answer) {
  let result = [];

  if (!guess || !/^[a-öA-Ö]+$/.test(guess) || typeof guess != "string") {
    return result;
  }
  const guessArr = guess.toUpperCase().split("");
  const answerArr = answer.toUpperCase().split("");

  let answerCount = {};
  answerArr.forEach((letter) => {answerCount[letter] = (answerCount[letter] || 0) + 1;});

  for (let i = 0;  i < answerArr.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      result.push({
        letter: guessArr[i],
        result: "correct"
      });
      answerCount[guessArr[i]]--;

      if (answerCount[guessArr[i]] < 0) {
        result.find(
          (obj) => obj.letter === guessArr[i] && obj.result === "misplaced"
        ).result = "incorrect";
      }
    } else if (answerCount[guessArr[i]] > 0) {
      result.push({
        letter: guessArr[i],
        result: "misplaced"
      });
      answerCount[guessArr[i]]--;
      
    } else {
      result.push({
        letter: guessArr[i],
        result: "incorrect"
      });
    }
  }
  return result;
}
