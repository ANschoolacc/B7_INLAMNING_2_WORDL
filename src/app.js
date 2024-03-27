
import express from "express";
import fs from 'fs'
import getDictionary from "../utils/wordList.js";

import apiRouter from "../routes/api.js";

export const app = express();
app.use(express.json())

app.get('/', async (req, res) => {

})

app.use('/api', apiRouter )


app.use(express.static('./public'));

export default app;
