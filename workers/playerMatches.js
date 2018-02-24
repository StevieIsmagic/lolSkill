//must retrieve the last matchs for each one of the users, last retrieved match's timestamp must be the beginTime in riot api call
const matchsByAccountId = require('../riotApi').matchsByAccountId;
const accountIdByPlayerName = require('../riotApi').accountIdByPlayerName;
const players = new Map();
global.playerss = players;
const matches = new Map();
const playerData = {
  matches: []
};

//  lastRetrieve : new Date('December 17, 2010').getTime(),
players.set('DoubleLift', playerData);
players.set('KingVexx', playerData);
players.set('Ikzencriel', playerData);
players.set('LAFLKDAMKAMDVKSMGDOASJGOASJGDOASJGDSGDOSJG', playerData);
//const accountIdByPlayerName = require('./utils').accountIdByPlayerName;
//const matchsByAccountId = require('./matchsByAccountId');


const playerMatchesWorker = async () => {
//  matches.set(matchID, { ...matchData, receivedData });
// must iterate over players map and retrieve from riot api
  Array.from(players.entries()).forEach(async (data) => {
    const playerName = data[0];
    const playerData = data[1];
    // must find matchsByAccountID, if current player doesn't have an accountID property, use accoundIdByPlayerName function
    if (!playerData.hasOwnProperty('accountId')) {
      const accountNamePromise = await accountIdByPlayerName(playerName);
      if (!accountNamePromise.data) return players.delete(playerName);
      playerData.accountId = accountNamePromise.data.accountId;
    }
    matchsByAccountId(playerData.accountId).then(res => {
      if (!res.data) return;
      res.data.matches.forEach(game => {
        const matchData = { ...{},
          role: game.role,
          lane: game.lane,
          champion: game.champion,
        }
        playerData.matches.push({ gameId: game.gameId, extra: matchData });
        matches.set(game.gameId, {});
      })
      players.set(playerName, playerData);
    })
    .catch(res => players.delete(playerName));
  });
};
playerMatchesWorker();
global.setTimeout(() => console.log(players), 3500);

module.exports = {
  playerMatchesWorker,
};
