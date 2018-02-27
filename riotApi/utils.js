const axios = require('axios');
const apiKey = require('../secret.js').riotGamesApiKey;

const errorIdentify = (error) => {
  if (error === 403) return 'Forbidden'
  return null;
};

const accountIdByPlayerName = name =>
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`
    )
    .then(res => res.data.accountId)
    .catch(error => errorIdentify(error.response.status))

module.exports = {
  accountIdByPlayerName
};
