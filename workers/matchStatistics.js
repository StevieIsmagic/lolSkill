//must retrieve the last matchs for each one of the users, last retrieved match's timestamp must be the beginTime in riot api call
const matchsByAccountID = require('./riotApi').matchsByAccountID;


const matchStatisticsWorker = (players) => {
  players.forEach(player => {
    //getMatchsBydAccountId
  });

};


module.exports = {
  matchStatisticsWorker,
};
