const axios = require('axios');

const playerStatisticsByName = playerName => {
  console.log(playerName);
};

const findPlayerByName = name => {
  axios
    .get(`https://www.google.com/search?q=${name}`)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

// playerStatisticsByName('Doublelift');
findPlayerByName('Doublelift');
