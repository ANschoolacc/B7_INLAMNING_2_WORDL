

export default function randomWord(wordList, wordLength, uniqueLetters) {
    if (!wordList || !wordList.length || !Array.isArray(wordList)) {
        throw new Error("No words found on server!");
    }

    let validList = wordList.filter((word) => word.length === wordLength);
    
        if(uniqueLetters) {
            validList.forEach(word => {
    
               for (let i = 0; i < word.length; i++) {
                    for (let j = i + 1; j < word.length; j++) {
                        if(word[i] === word[j]) {
                            
                            validList.splice(validList.indexOf(word), 1)
                        }
                    }
    
               }
            })
        }
    
    if (!validList.length) {
        throw new Error("No valid word matching criteria!");
    } else {
        const word = validList[Math.floor(Math.random() * validList.length)];
        return word;
}
}
