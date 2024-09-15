const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL;

exports.getLeagues = async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/leagues`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLeagueDetails = async (req, res) => {
    const { league_id } = req.params;
    try {
        const response = await axios.get(`${API_BASE_URL}/leagues/${league_id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSeasons = async (req, res) => {
    const { league_id } = req.params;
    try {
        const response = await axios.get(`${API_BASE_URL}/leagues/${league_id}/seasons`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getStandings = async (req, res) => {
    const { league_id } = req.params;
    const { season } = req.query;
    try {
        const response = await axios.get(`${API_BASE_URL}/leagues/${league_id}/standings`, {
            params: { season },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
