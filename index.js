const accountIdByPlayerName = require('./riotApi').accountIdByPlayerName;
const matchsByAccountId = require('./riotApi').matchsByAccountId;
console.log(matchsByAccountId);
const player = accountIdByPlayerName('Doublelift');
player.then(res => {
    console.log(res.data.accountId);
    matchsByAccountId(res.data.accountId).then(res => console.log(res));
  });
