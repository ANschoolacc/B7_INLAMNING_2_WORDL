
import express from "express";
import fs from 'fs/promises'

export const app = express();

app.get('/', async (req, res) => {
  const buf = await fs.readFile('./public/index.html');
  const html = buf.toString();  
  res.send(html)
})

app.use(express.static('./public'));

export default app;
