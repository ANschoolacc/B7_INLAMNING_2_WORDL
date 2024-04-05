import express from "express"
import { Score } from "../src/models.js"

const leaderboardRouter = express.Router()

leaderboardRouter.get('/', async (req, res) => {
  const scores = await Score.find();
  res.render('leaderboard', {scores: scores})
})


export default leaderboardRouter;