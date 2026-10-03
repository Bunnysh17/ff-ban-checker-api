# Free Fire Ban Checker API 🔥

Real-Time Free Fire Ban Status and Player Profile API powered by Official Garena Anti-Hack System.

Developed by **Bunnysh17**.

## Features ⚡
- **Official Garena Verification**: Directly checks Garena's Anti-Hack detection system.
- **Accurate Ban Status**: Distinguishes between Clean accounts, Temporary bans (1 Week, 1 Month, 3 Months, 6 Months, 1 Year), and Permanent bans.
- **Real In-Game Player Data**: Supports Nickname, Level, Likes, Guild, and Region.
- **Zero Config Vercel Deployment**: Ready for 1-click cloud deployment.
- **CORS Enabled**: Can be called from any frontend, web app, or Discord/Telegram bot.

## Endpoints 📡

### Check Ban Status
```http
GET /check?uid=<PLAYER_UID>
```

#### Example Clean Response:
```json
{
  "success": true,
  "uid": "1171436371",
  "nickname": "ᴺˣᵀᎪᏀɴᴏᴏʙ☃",
  "level": 70,
  "likes": 32477,
  "exp": 3024013,
  "guild": "ＮＸＴ",
  "region": "IND",
  "is_banned": false,
  "ban_status": "Clean account",
  "ban_period": null,
  "period_desc": "Clean",
  "message": "There is currently not enough evidence to prove that this account is using hacks.",
  "developer": "Bunnysh17"
}
```

#### Example Banned Response:
```json
{
  "success": true,
  "uid": "18338632768",
  "nickname": "KR-BOT40077",
  "level": 2,
  "likes": 0,
  "exp": 48,
  "guild": "None",
  "region": "IND",
  "is_banned": true,
  "ban_status": "BANNED",
  "ban_period": "1 Week",
  "period_desc": "Banned in this week",
  "message": "We have confirmed that this account has used hack(s) and has been banned in this week.",
  "developer": "Bunnysh17"
}
```

## Running Locally 💻
```bash
npm install
npm start
```
Server runs on `http://localhost:3000`.

## Deploy to Vercel 🚀
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com).
3. Import your repository and click **Deploy**.
