
import express from "express";
import apiRouter from "../routes/api.js";
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)

export const app = express();
app.use(express.json())

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  res.render("index", {wordleGame: true})
})

app.get('/leaderboard', async (req, res) => {

})

app.get('/about', async (req, res) => {

})

app.use('/api', apiRouter )


app.use('/static', express.static('./static'));

export default app;
