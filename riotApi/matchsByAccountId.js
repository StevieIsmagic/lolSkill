const axios = require('axios');
const apiKey = require('../secret.js').riotGamesApiKey;

const matchsByAccountId = (accountId) => 
  // playerStatisticsByName('Doublelift');
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${apiKey}`
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

module.exports =  matchsByAccountId;
