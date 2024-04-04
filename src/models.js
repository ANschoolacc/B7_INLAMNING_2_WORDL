import mongoose from "mongoose";

const Score = mongoose.model('Score', {
  sessionId: String,
  word: String,
  startTime: Number,
  guesses: Array,
  endTime: Number,
  uniqueLetters: String,
  name: String,
});

export { Score };