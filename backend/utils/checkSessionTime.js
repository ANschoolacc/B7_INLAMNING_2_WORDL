export default function checkSessionTime(sessions) {
  if(!sessions.length){
    return [];
  }else{
  return sessions.filter((session) => {
    return ((Date.now() - session.startTime) / 1000) < 86400;
  });
};
};