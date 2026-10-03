const { fetchPlayerData } = require('../services/fetchPlayerData');
const { fetchBanStatus } = require('../services/fetchBanStatus');

async function getBanInfo(req, res) {
  const uid = req.query.uid;
  const region = req.query.region || req.query.server || 'IND';

  if (!uid || !/^\d+$/.test(uid.trim())) {
    return res.status(400).json({
      success: false,
      error: "Valid numeric UID parameter is required. Example: /check?uid=1171436371"
    });
  }

  const cleanUid = uid.trim();

  try {
    // 1. Fetch real ban status from Garena Anti-Hack API
    const ban = await fetchBanStatus(cleanUid);

    // If ID is not found on Garena Anti-Hack
    if (ban.ban_status === 'ID NOT FOUND') {
      return res.status(404).json({
        success: false,
        uid: cleanUid,
        status: "NOT_FOUND",
        error: "ID NOT FOUND (Player does not exist on Garena servers)",
        developer: "Bunnysh17"
      });
    }

    // 2. Fetch Real Player Details (Exact Level, Likes, Nickname, Guild)
    const player = await fetchPlayerData(cleanUid, region);

    res.json({
      success: true,
      uid: cleanUid,
      nickname: player.nickname,
      level: player.level,
      likes: player.likes,
      exp: player.exp,
      guild: player.guild,
      region: player.region,
      is_banned: ban.is_banned,
      ban_status: ban.ban_status,
      ban_period: ban.ban_period,
      period_desc: ban.period_desc,
      message: ban.message,
      developer: "Bunnysh17"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

module.exports = { getBanInfo };
