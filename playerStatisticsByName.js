const axios = require('axios');
const playerIdByName = require('./utils.js').findPlayerIdByName;

console.log(playerIdByName);
// const playerStatisticsByName = playerName => {
//   console.log(playerName);
// };

// const findPlayerByName = name =>

// playerStatisticsByName('Doublelift');
const playerIdPromise = playerIdByName('Doublelift');
console.log(playerIdPromise);

playerIdPromise.then(res => {
  console.log(res.data);
});
