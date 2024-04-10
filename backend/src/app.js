
import express from "express";
import apiRouter from "../routes/api.js";
import leaderboardRouter from "../routes/leaderboard.js";
import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.DB_URL)

export const app = express();
app.use(express.json())

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  res.render("index")
})

app.get('/about', async (req, res) => {
  res.render('about')
})

app.use('/api', apiRouter )
app.use('/leaderboard', leaderboardRouter)


app.use('/static', express.static('./static'));

export default app;
