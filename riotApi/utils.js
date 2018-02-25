const axios = require('axios');
const apiKey = require('../secret.js').riotGamesApiKey;

const accountIdByPlayerName = name =>
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`
    )
    .then(res => res.data.accountId)
    .catch(error => null)


module.exports = {
  accountIdByPlayerName
};
