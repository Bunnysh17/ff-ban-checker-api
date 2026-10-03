const axios = require('axios');

const TIMELINE_MAP = {
  1: { timeline: 'Banned in this week (Recent)', ban_period: 'Permanent' },
  2: { timeline: 'Banned in this month (Within 30 Days)', ban_period: 'Permanent' },
  3: { timeline: 'Banned in recent 3 months', ban_period: 'Permanent' },
  4: { timeline: 'Banned in recent 6 months', ban_period: 'Permanent' },
  5: { timeline: 'Banned in recent 1 year', ban_period: 'Permanent' },
  6: { timeline: 'Banned over 1 year ago', ban_period: 'Permanent' }
};

/**
 * Checks ban status directly from Garena Official Anti-Hack system.
 * URL: https://ff.garena.com/api/antihack/check_banned?lang=en&uid=${uid}
 */
async function fetchBanStatus(uid) {
  const url = `https://ff.garena.com/api/antihack/check_banned?lang=en&uid=${encodeURIComponent(uid)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'authority': 'ff.garena.com',
        'referer': 'https://ff.garena.com/en/support/',
        'x-requested-with': 'B6FksShzIgjfrYImLpTsadjS86sddhFH'
      },
      timeout: 8000
    });

    const resData = response.data;
    if (resData && resData.status === 'success' && resData.data) {
      const data = resData.data;
      const isBanned = data.is_banned === 1;
      const periodCode = Number(data.period) || 0;
      const timelineInfo = TIMELINE_MAP[periodCode] || {
        timeline: isBanned ? 'Permanent Ban' : 'Clean Account',
        ban_period: isBanned ? 'Permanent' : null
      };

      return {
        is_banned: isBanned,
        ban_status: isBanned ? 'PERMANENTLY BANNED' : 'Clean account',
        ban_period: isBanned ? 'Permanent' : null,
        banned_timeline: isBanned ? timelineInfo.timeline : 'Not Banned',
        period_code: periodCode,
        message: isBanned 
          ? 'We have confirmed that this account has used hack(s) and has been banned permanently.' 
          : 'There is currently not enough evidence to prove that this account is using hacks.'
      };
    } else if (resData && resData.status === 'error') {
      return {
        is_banned: false,
        ban_status: 'ID NOT FOUND',
        ban_period: null,
        banned_timeline: 'ID NOT FOUND',
        period_code: 0,
        message: 'No matched account found on Garena Free Fire servers.',
        error: resData.msg || 'Invalid request'
      };
    }

    return {
      is_banned: false,
      ban_status: 'Clean account',
      ban_period: null,
      banned_timeline: 'Not Banned',
      period_code: 0,
      message: 'There is currently not enough evidence to prove that this account is using hacks.'
    };
  } catch (error) {
    return {
      is_banned: false,
      ban_status: 'Unknown',
      ban_period: null,
      banned_timeline: 'Unknown',
      period_code: 0,
      message: 'Network error checking Garena Anti-Hack API: ' + error.message,
      error: error.message
    };
  }
}

module.exports = { fetchBanStatus };
