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
  matches: {}
};

//  lastRetrieve : new Date('December 17, 2010').getTime(),
players.set('LAFLKDAMKAMDVKSMGDOASJGOASJGDOASJGDSGDOSJG', playerData);
//const accountIdByPlayerName = require('./utils').accountIdByPlayerName;
//const matchsByAccountId = require('./matchsByAccountId');

const matchStatisticsWorker = async () => {
  const retrieveData = async (matchId) => {
    console.log('match', matchId);
    const matchData = await matchByMatchId(matchId);
    matches.set(matchId, matchData);
  };
  const entries = Array.from(matches.entries());
  const getMatches = async (index = 0) => {
    if (index >= entries.length) return true;
    const matchId = entries[index][0];
    if (!matchId) return getMatches(++index);
    retrieveData(matchId);
    await setTimeoutPromise(5000);
    return getMatches(++index);
  }
  return getMatches();
};

const playerMatchesWorker = async () => {
//  matches.set(matchID, { ...matchData, receivedData });
// must iterate over players map and retrieve from riot api
  const entries = Array.from(players.entries());
  const arrangePlayers = async (index = 0) => {
    if (index >= entries.length) return true;
    const playerName = entries[index][0];
    const playerData = entries[index][1];
    const playerAccountId = await accountIdByPlayerName(playerName);
    if (!playerAccountId) { 
      players.delete(playerName); 
      return arrangePlayers(++index);
    }
    playerData.accountId = playerAccountId;
    const getPlayerMatches = async () => {
      const playerMatches = await matchsByAccountId(playerData.accountId);
      if (!playerMatches) return arrangePlayers(++index);
      playerMatches.forEach(game => {
        // include this match in matches worker.
        matches.set(game.gameId, {});
      });
    };
    await getPlayerMatches();
    players.set(playerName, playerData);
    return arrangePlayers(++index);
  }
  return await arrangePlayers();
}  


(async () => {
  players.set('DoubleLift', playerData);
  players.set('KingVexx', playerData);
  players.set('Ikzencriel', playerData);
  console.log('before executing playerMatchsWorker', players);
  const test = await playerMatchesWorker();
  console.log(players.get('DoubleLift'));
  await matchStatisticsWorker();
})()

module.exports = {
  playerMatchesWorker,
};
