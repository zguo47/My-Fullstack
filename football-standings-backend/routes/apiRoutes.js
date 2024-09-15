const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/leagues', apiController.getLeagues);
router.get('/leagues/:league_id', apiController.getLeagueDetails);
router.get('/leagues/:league_id/seasons', apiController.getSeasons);
router.get('/leagues/:league_id/standings', apiController.getStandings);

module.exports = router;
