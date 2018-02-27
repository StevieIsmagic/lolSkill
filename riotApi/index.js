const accountIdByPlayerName = require('./utils').accountIdByPlayerName;
const matchsByAccountId = require('./matchsByAccountId').matchsByAccountId;
const matchByMatchId = require('./matchsByAccountId').matchByMatchId;

module.exports = {
  accountIdByPlayerName,
  matchsByAccountId,
  matchByMatchId
}
