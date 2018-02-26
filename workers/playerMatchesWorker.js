//must retrieve the last matchs for each one of the users, last retrieved match's timestamp must be the beginTime in riot api call
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const matchsByAccountId = require('../riotApi').matchsByAccountId;
const accountIdByPlayerName = require('../riotApi').accountIdByPlayerName;
const matchByMatchId = require('../riotApi').matchByMatchId;
const players = new Map();
global.players = players;
const matches = new Map();
const playerData = {
  matches: [],
  caseSensitiveName : ''
};

//  lastRetrieve : new Date('December 17, 2010').getTime(),
players.set('LAFLKDAMKAMDVKSMGDOASJGOASJGDOASJGDSGDOSJG', playerData);

const playerMatchesWorker = async () => {
// must iterate over players map check if it is an actual account, remove if not, retrieve accountId from riotApi and set up matches map
  const keys = players.keys();
  const arrangePlayers = async (key) => {
    console.log(key);
    const newKey = keys.next().value;
    const playerData = players.get(key);
    const playerName = key;
    const playerAccountId = await accountIdByPlayerName(playerName);
    if (playerAccountId === 'Forbidden') { 
      return true;
    }
    console.log(playerAccountId);
    if (!playerAccountId) { 
      players.delete(playerName); 
      return newKey ? arrangePlayers(newKey) : true;
    }
    playerData.accountId = playerAccountId;
    const getPlayerMatches = async () => {
      const playerMatches = await matchsByAccountId(playerData.accountId, 10);
      if (!playerMatches) return newKey ? arrangePlayers(newKey) : true;
      playerMatches.forEach((game) => {
        // include this match in matches worker.
        if(!matches.get(game.gameId)) matches.set(game.gameId, {});
      });
    };
    await getPlayerMatches();
    players.set(playerName, playerData);
    if (!newKey) return true;
    return arrangePlayers(newKey);
  }
  return await arrangePlayers(keys.next().value);
}  
/*

(async () => {
  const doba = 'doublelift'.toUpperCase();
  players.set(doba.toUpperCase(), playerData);
//  console.log('before executing playerMatchsWorker', players);
  const test = await playerMatchesWorker();
  matchStatisticsWorker();
  await setTimeoutPromise(3000);
  console.log(players.get(doba));
  await setTimeoutPromise(4000);
  console.log(players.get(doba));
  await setTimeoutPromise(29000);
  console.log(players.get(doba));
  console.log(players);
})()
*/ 

module.exports = {
  playerMatchesWorker,
}
