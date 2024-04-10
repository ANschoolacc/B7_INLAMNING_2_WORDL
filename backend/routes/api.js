import express from "express";
import { v4 as uuidv4 } from 'uuid';
import randomWord from "../utils/randomWord.js";
import feedback from "../utils/feedback.js";
import getDictionary from "../utils/wordList.js";
import checkSessionTime from "../utils/checkSessionTime.js";
import { Score } from "../src/models.js";


const apiRouter = express.Router();

let sessions = [];

/*Every hour (in milliseconds) checksessionTime function removes all 
game sessions that has gone on for longer than 24 hours (86400s).*/
setInterval(() => {
  console.log('Filtering sessions.')
  sessions = checkSessionTime(sessions)
}, 3600000);

apiRouter.post('/new_game', async (req, res) => {
  const difficulty = req.body;
  const correctWord = await randomWord(await getDictionary(), difficulty.length, difficulty.uniqueLetters);

  if(!correctWord){
    res.statusMessage = 'No word found matching criteria.'
    res.status(404).json('');
  }else{
  const session = {
    sessionId: uuidv4(),
    word: correctWord,
    startTime: Date.now(),
    guesses: [],
  }
  sessions.push(session);
  res.status(200).json(session.sessionId);
}
})

apiRouter.post('/:id/guess', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.find(session => session.sessionId === sessionId);

  if(!session){
    res.statusMessage = 'Session timed out, please start a new game.'
    res.status(404).json('Session timed out, please start a new game.')
  }else{
  const guess = req.body.newGuess;

  session.guesses.push(guess);

  const guessResult = feedback(guess, session.word);

  if (guessResult.map((letter) => letter.result).every(value => value === 'correct')) {
    Object.assign(session, {
      endTime: Date.now(),
      uniqueLetters: new Set(session.word).size === session.word.length ? 'Yes' : 'No'
    });
    res.send([guessResult, session])
  } else {
    res.send([guessResult])
  }
}

})

apiRouter.post('/:id/score', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.find(session => session.sessionId === sessionId);

  if(!session){
    res.statusMessage = 'Session timed out, please start a new game.'
    res.status(404).json('Session timed out, please start a new game.')
  }else{

  Object.assign(session, { name: req.body.playerName })
  const scoreModel = new Score(session);
  await scoreModel.save();

  sessions = sessions.filter(session => {
    return session.sessionId !== sessionId;
  })

  res.status(201).send('Score posted!')
}
})

export default apiRouter;