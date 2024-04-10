

export default function randomWord(wordList, wordLength, uniqueLetters) {
    if (!wordList || !wordList.length || !Array.isArray(wordList)) {
        return '';
    }

    let validList = wordList.filter((word) => word.length === wordLength);

    if (uniqueLetters) {
        validList = validList.filter(
            word => new Set(word).size === word.length)
    }

    if (!validList.length) {
        return '';
    } else {
        const word = validList[Math.floor(Math.random() * validList.length)];
        return word;
    }
}
