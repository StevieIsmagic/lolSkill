const axios = require('axios');
const apiKey = 'RGAPI-7a7fd01d-0e08-411a-924d-843bf8a57411';

const findPlayerIdByName = name =>
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`
    )
    .then(res => {
      // console.log(res);
      return res;
    })
    .catch(error => {
      // console.log(error);
      return error;
    });

module.exports = {
  findPlayerIdByName
};
