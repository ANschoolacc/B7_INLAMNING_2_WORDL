import express from "express";
import { v4 as uuidv4 } from 'uuid';
import randomWord from "../utils/randomWord.js";
import feedback from "../utils/feedback.js";
import getDictionary from "../utils/wordList.js";
const apiRouter = express.Router();

let sessions = [];

apiRouter.post('/new_game', async (req, res) => {
  const difficulty = req.body;
  const correctWord = await randomWord(await getDictionary(), difficulty.length, difficulty.uniqueLetters)
  const session = {
    id: uuidv4(),
    word: correctWord,
    startTime: Date.now(),
    guesses: [],
  }

  sessions.push(session);
  res.status(200).json(session.id);
})

apiRouter.post('/:id/guess', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.find(session => session.id === sessionId);
  const guess = req.body.newGuess;

  session.guesses.push(guess);

  const guessResult = feedback(guess, session.word)

  if (guessResult.map((letter) => letter.result).every(value => value === 'correct')) {
    Object.assign(session, {
      endTime: Date.now(),
      uniqueLetters: new Set(session.word).size === session.word.length ? 'Yes' : 'No'
    });
    res.send([guessResult, session])
  } else {
    res.send([guessResult])
  }

})

apiRouter.post('/:id/score', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.find(session => session.id === sessionId);

  Object.assign(session, { name: req.body.playerName })

  res.status(201).send('Score posted!')

})

export default apiRouter;