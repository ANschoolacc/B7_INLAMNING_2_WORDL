import  express  from "express";
import randomWord from "../utils/randomWord.js";
import feedback from "../utils/feedback.js";
import getDictionary from "../utils/wordList.js";
const apiRouter = express.Router();

let correctWord;
let highScores = [];

apiRouter.post('/difficulty', async (req, res) => {
  correctWord = await randomWord( await getDictionary(), req.body.chosenLength, req.body.uniqueLetters)
  res.status(201).send(correctWord)
})

apiRouter.post('/feedback', async (req, res) => {
  const guessResult = await feedback(req.body.newGuess, correctWord)
  res.send(guessResult)
})  

apiRouter.post('/newScore', async (req, res) => {
  const score = req.body; 
  highScores.push(score);
  console.log(highScores)
})  

export default apiRouter;