//must retrieve the last matchs for each one of the users, last retrieved match's timestamp must be the beginTime in riot api call
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const matchsByAccountId = require('../riotApi').matchsByAccountId;
console.log(matchsByAccountId);
const accountIdByPlayerName = require('../riotApi').accountIdByPlayerName;
const matchByMatchId = require('../riotApi').matchByMatchId;
const players = new Map();
global.playerss = players;
const matches = new Map();
const playerData = {
  matches: [],
  caseSensitiveName : ''
};

//  lastRetrieve : new Date('December 17, 2010').getTime(),
players.set('LAFLKDAMKAMDVKSMGDOASJGOASJGDOASJGDSGDOSJG', playerData);

const matchStatisticsWorker = async () => {
  const retrieveData = async (matchId) => {
    console.log('match', matchId);
    const matchData = await matchByMatchId(matchId);
    matchData.players.forEach(playerMatchData => {
      let playerData = players.get(playerMatchData.summonerName.toUpperCase());
      if (!playerData) { 
          playerData = { 
            matches: [] , 
            caseSensitiveName: playerMatchData.summonerName
          }; 
      }
      playerData.matches.push(playerMatchData);
      players.set(playerMatchData.summonerName.toUpperCase(), playerData);
    });
    matches.set(matchId, matchData);
    return true;
  };
  const entries = Array.from(matches.entries());
  const getMatches = async (index = 0) => {
    if (index >= entries.length) return true;
    const matchId = entries[index][0];
    if (!matchId) return getMatches(++index);
    retrieveData(matchId);
// 200 regs per min is the limit of riot API so wait 3 segs each retrieve
    await setTimeoutPromise(3000);
    return getMatches(++index);
  }
  return getMatches();
};


module.exports = {
  playerMatchesWorker,
}
