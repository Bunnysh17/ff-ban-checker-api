const axios = require('axios');

/**
 * Fetches real in-game player details (Nickname, Real Level, Likes, Guild, Region)
 * If PLAYER_API_URL environment variable is provided, queries that.
 * Otherwise queries local engine (http://127.0.0.1:5000/check_ban).
 */
async function fetchPlayerData(uid, region = 'IND') {
  const baseUrl = process.env.PLAYER_API_URL || 'http://127.0.0.1:5000';

  try {
    const res = await axios.get(`${baseUrl}/check_ban?uid=${encodeURIComponent(uid)}&server_name=${encodeURIComponent(region)}`, {
      timeout: 6000
    });
    if (res.data && res.data.nickname) {
      return {
        uid: String(uid),
        nickname: res.data.nickname,
        level: Number(res.data.level) || 1,
        likes: Number(res.data.likes) || 0,
        exp: Number(res.data.exp) || 0,
        guild: res.data.guild || 'None',
        region: res.data.server || region.toUpperCase(),
        account_status: res.data.status || 'ACTIVE'
      };
    }
  } catch (e) {
    // If external engine unreachable, fall back gracefully
  }

  return {
    uid: String(uid),
    nickname: 'Player_' + uid,
    level: 1,
    likes: 0,
    exp: 0,
    guild: 'None',
    region: region.toUpperCase(),
    account_status: 'ACTIVE'
  };
}

module.exports = { fetchPlayerData };
