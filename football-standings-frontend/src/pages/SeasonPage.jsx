import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SeasonPage.css';
import { useNavigate } from 'react-router-dom';

const SeasonPage = () => {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/leagues/${leagueId}/seasons`)
            .then((response) => {
                if (response.data.status) {
                    setSeasons(response.data.data.seasons);
                } else {
                    console.error('Error fetching seasons');
                }
            })
            .catch((error) => console.error(error));
    }, [leagueId]);

    return (
        <div className="seasonpage">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h1 className="seasonpage-title">Available Seasons</h1>
            <ul className="season-container">
                {seasons.map((season) => (
                    <Link to={`/league/${leagueId}/standings?season=${season.year}`} className="season-button">
                        <span className="season-name">{season.year}</span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default SeasonPage;
