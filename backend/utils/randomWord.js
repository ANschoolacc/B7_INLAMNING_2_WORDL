

export default function randomWord(wordList, wordLength, uniqueLetters) {
    if (!wordList || !wordList.length || !Array.isArray(wordList)) {
        throw new Error("No words found on server!");
    }

    let validList = wordList.filter((word) => word.length === wordLength);

    if (uniqueLetters) {
        validList = validList.filter(
            word => new Set(word).size === word.length)
    }

    if (!validList.length) {
        throw new Error("No valid word matching criteria!");
    } else {
        const word = validList[Math.floor(Math.random() * validList.length)];
        return word;
    }
}
