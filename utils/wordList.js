import fetch from "node-fetch";

export default async function getDictionary(){
  const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
  const payload = await response.json()
  return Object.keys(payload);
}