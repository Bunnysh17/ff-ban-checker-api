const axios = require('axios');

const PERIOD_MAP = {
  1: { period: '1 Week', desc: 'Banned in this week', message: 'We have confirmed that this account has used hack(s) and has been banned in this week.' },
  2: { period: '1 Month', desc: 'Banned in this month', message: 'We have confirmed that this account has used hack(s) and has been banned in this month.' },
  3: { period: '3 Months', desc: 'Banned in recent 3 months', message: 'We have confirmed that this account has used hack(s) and has been banned in recent 3 months.' },
  4: { period: '6 Months', desc: 'Banned in recent 6 months', message: 'We have confirmed that this account has used hack(s) and has been banned in recent 6 months.' },
  5: { period: '1 Year', desc: 'Banned in recent year', message: 'We have confirmed that this account has used hack(s) and has been banned in recent year.' },
  6: { period: 'Permanent', desc: 'Already permanently banned', message: 'We have confirmed that this account has used hack(s) and has already been banned.' }
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
      const periodInfo = PERIOD_MAP[periodCode] || {
        period: periodCode > 0 ? `${periodCode} months` : (isBanned ? 'Permanent' : null),
        desc: isBanned ? 'Account is banned' : 'Account is clean',
        message: isBanned ? 'We have confirmed that this account has used hack(s) and is banned.' : 'There is currently not enough evidence to prove that this account is using hacks.'
      };

      return {
        is_banned: isBanned,
        ban_status: isBanned ? 'BANNED' : 'Clean account',
        ban_period: isBanned ? periodInfo.period : null,
        period_code: periodCode,
        period_desc: isBanned ? periodInfo.desc : 'Clean',
        message: isBanned ? periodInfo.message : 'There is currently not enough evidence to prove that this account is using hacks.'
      };
    } else if (resData && resData.status === 'error') {
      return {
        is_banned: false,
        ban_status: 'ID NOT FOUND',
        ban_period: null,
        period_code: 0,
        message: 'No matched account found on Garena Free Fire servers.',
        error: resData.msg || 'Invalid request'
      };
    }

    return {
      is_banned: false,
      ban_status: 'Clean account',
      ban_period: null,
      period_code: 0,
      message: 'There is currently not enough evidence to prove that this account is using hacks.'
    };
  } catch (error) {
    return {
      is_banned: false,
      ban_status: 'Unknown',
      ban_period: null,
      period_code: 0,
      message: 'Network error checking Garena Anti-Hack API: ' + error.message,
      error: error.message
    };
  }
}

module.exports = { fetchBanStatus };
