export default function filterScores(scores ,length, unique){
  if(!scores.length || !scores){
    return [];
  }
  if(length){
    scores = scores.filter(score => score.word.length == length)
  }
  if(unique){
    scores = scores.filter(score => score.uniqueLetters === 'Yes')
  }
  
  return scores;
}