
import express from "express";
import fs from 'fs'
import getDictionary from "../utils/wordList.js";
import apiRouter from "../routes/api.js";
/*import mongoose from "mongoose";*/

/*mongoose.connect('mongodb+srv://albinchnilsson:FIDhGm8ZhAYLWvDT@cluster0.kp7n7md.mongodb.net/?retryWrites=true&w=majority&appName=cluster0')*/

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
