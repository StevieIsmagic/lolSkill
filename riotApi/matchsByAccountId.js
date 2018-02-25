const axios = require('axios');
const apiKey = require('../secret.js').riotGamesApiKey;

const matchsByAccountId = (accountId) => 
  // playerStatisticsByName('Doublelift');
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${apiKey}`
    )
    .then(res => res.data.matches)
    .catch(error => null)


const matchByMatchId = (matchId) => 
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${apiKey}`
    )
    .then(res => {
      const matchInfo = {};
  // riot api divded into data-sessions 
  // participantsIdentities used to identify who participant is
      const participantsIdentities = res.data.participantIdentities;
      matchInfo.players = participantsIdentities.map(participant => { 
        return { 'sumonnerName'  : participant.player.summonerName };
      }); 
  //  participants contains the data  for each participant in the related match.
      const participants = res.data.participants;

      matchInfo.gameMode = res.data.gameMode;
      matchInfo.gameType = res.data.gameType;
      matchInfo.winnerTeam = res.data.teams[0].win === 'Win' ? 0 : 1;
      //must set players as an array to serve as reference for riot's api 'participantId' 
      matchInfo.players.forEach((player, index) => {
        const playerData = participants[index];
        const stats = playerData.stats;
        const timeline = playerData.timeline;
        player.items = [ stats.item0, stats.item1, stats.item3,
                         stats.item4, stats.item5, stats.item6 ];
        Object.assign(player, { 
          kills: stats.kills, 
          deaths: stats.deaths, 
          assists: stats.assists, 
          pentaKills: stats.pentaKills, 
          totalDamageDealtToChampions: stats.totalDamageDealtToChampions,
          totalDamageTaken : stats.totalDamageTaken, 
          goldEarned: stats.goldEarned,
          creepsPerMin : timeline.creepsPerMinDeltas,
          xpPerMin: timeline.xpPerMinDeltas,
          goldPerMin : timeline.goldPerMinDeltas,
          csDiffPerMin : timeline.csDiffPerMinDeltas,
          xpDiffPerMin : timeline.xpDiffPerMinDeltas,
          damageTakenPerMin : timeline.damageTakenPerMinDeltas,
          damageTakenDiffPerMin : timeline.damageTakenDiffPerMinDeltas,
          laneStatsComputed: timeline.lane 
        });
      });
      console.log(matchInfo);
      return res.data
    })
    .catch(error => null)

module.exports =  { 
  matchsByAccountId,
  matchByMatchId,
};
