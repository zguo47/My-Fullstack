import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        axios
            .get('/api/leagues')
            .then((response) => {
                if (response.data.status) {
                    setLeagues(response.data.data);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="homepage">
            <h1 className="homepage-title">Football Standings</h1>
            <h2 className="homepage-subtitle">Start by selecting a league to view its standings</h2>
            <div className="league-container">
                {leagues.map((league) => (
                    <Link to={`/league/${league.id}/seasons`} key={league.id} className="league-button">
                        <img src={league.logos.light} alt={`${league.name} logo`} className="league-logo" />
                        <span className="league-name">{league.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;