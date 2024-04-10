import express from "express"
import filterScores from "../utils/filterScores.js"
import { Score } from "../src/models.js"

const leaderboardRouter = express.Router()

leaderboardRouter.get('/', async (req, res) => {
  let scores = await Score.find();
  
  scores = await filterScores(
    scores,
    req.query.word_length,
    req.query.unique_letters)

  if (!scores) {
    res.statusMessage = 'No scores found'
    res.status(404).render('leaderboard', { scores: [], noScores: true })
  } else if (!scores.length) {
    res.render('leaderboard', { scores: scores, noScores: true })
  } else {
    res.render('leaderboard', { scores: scores, noScores: false, errorMessage: 'No scores found' })
  }

})


export default leaderboardRouter;