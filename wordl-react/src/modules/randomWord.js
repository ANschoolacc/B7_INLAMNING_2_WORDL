
export default function randomWord(wordList, wordLength, uniqueLetters) {
  if (!wordList || !wordList.length || typeof wordList === 'array') {
    throw new Error('No words found on server!')
  }
  let validList = wordList.filter((x) => x.length == wordLength);

  for (let i = validList.length - 1; i >= 0; i--) {
    const letters = validList[i].split("");
    let letterCount = {};

    letters.forEach((letter) => { letterCount[letter] = (letterCount[letter] || 0) + 1; });

    if (
      Object.values(letterCount).some((x) => x > 1) && uniqueLetters === true) {
      validList = validList.filter(item => item !== validList[i])
    }
  }
  if (!validList.length) {
    throw new Error('No valid word matching criteria!')
  } else {
    const word = validList[Math.floor(Math.random() * validList.length)];
    return word;
  }
}