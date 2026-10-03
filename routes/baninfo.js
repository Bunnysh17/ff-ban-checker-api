const express = require('express');
const { getBanInfo } = require('../controllers/bancontroller');

const router = express.Router();

router.get('/check', getBanInfo);
router.get('/api/check', getBanInfo);

router.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Free Fire Real-Time Ban Checker API by Bunnysh17',
    usage: '/check?uid=<PLAYER_UID>',
    example: '/check?uid=1171436371',
    developer: 'Bunnysh17'
  });
});

module.exports = router;
