import mongoose from "mongoose";

const Score = mongoose.model('Score', {
  name: String,
  word: String,
  time: Number,
  guesses: Number,
  wordLength: Number,
  uniqueLetters: String
});

export { Score };