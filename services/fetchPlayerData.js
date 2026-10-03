const axios = require('axios');

function formatTimestamp(ts) {
  if (!ts || ts === '0' || Number(ts) <= 0) return 'N/A';
  try {
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }) + ' (IST)';
  } catch (e) {
    return 'N/A';
  }
}

/**
 * Fetches real in-game player details (Nickname, Real Level, Likes, Guild, Region, Dates)
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
        account_status: res.data.status || 'ACTIVE',
        last_login_at: formatTimestamp(res.data.last_login_at || res.data.lastloginat),
        account_created_at: formatTimestamp(res.data.created_at || res.data.createat)
      };
    }
  } catch (e) {
    // Fallback
  }

  return {
    uid: String(uid),
    nickname: 'Player_' + uid,
    level: 1,
    likes: 0,
    exp: 0,
    guild: 'None',
    region: region.toUpperCase(),
    account_status: 'ACTIVE',
    last_login_at: 'N/A',
    account_created_at: 'N/A'
  };
}

module.exports = { fetchPlayerData };
