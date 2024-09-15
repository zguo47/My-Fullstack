import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './StandingsPage.css';
import { useNavigate } from 'react-router-dom';

const StandingsPage = () => {
    const { leagueId } = useParams();
    const [standingsData, setStandingsData] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const season = query.get('season');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/leagues/${leagueId}/standings`, {
                params: { season },
            })
            .then((response) => {
                if (response.data.status) {
                    setStandingsData(response.data.data);
                } else {
                    console.error('Error fetching standings');
                }
            })
            .catch((error) => console.error(error));
    }, [leagueId, season]);

    if (!standingsData) return <div>Loading...</div>;

    const standings = standingsData.standings;

    let lastDescription = null;
    let lastDescriptionClass = null;

    const generateClassName = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+$/g, '');
    };

    return (
        <div className="standingspage">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h1 className="standings-title" >
                {standingsData.name} - {standingsData.seasonDisplay} Standings
            </h1>
            <table className="standings-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goal Difference</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Points</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team) => {
                        console.log(team);
                        const position = team.stats.find((stat) => stat.name === 'rank')?.value;
                        const gamesplayed = team.stats.find((stat) => stat.name === 'gamesPlayed')?.value || 0;
                        const wins = team.stats.find((stat) => stat.name === 'wins')?.value || 0;
                        const losses = team.stats.find((stat) => stat.name === 'losses')?.value || 0;
                        const ties = team.stats.find((stat) => stat.name === 'ties')?.value || 0;
                        const pointsFor = team.stats.find((stat) => stat.name === 'pointsFor')?.value || 0;
                        const pointsAgainst = team.stats.find((stat) => stat.name === 'pointsAgainst')?.value || 0;
                        const pointsDifferential =
                            team.stats.find((stat) => stat.name === 'pointsDifferential')?.value ||
                            pointsFor - pointsAgainst;
                        const points = team.stats.find((stat) => stat.name === 'points')?.value || 0;
                        const description = team.note?.description || '';
                        const descriptionClass = description ? generateClassName(description) : '';
                        const groupLabelClass = description ? `group-label ${descriptionClass}-label` : '';

                        const showGroupLabel = description && description !== lastDescription && descriptionClass !== lastDescriptionClass;
                        lastDescription = description;
                        lastDescriptionClass = descriptionClass;

                        return (
                            <React.Fragment key={team.team.id}>
                                {showGroupLabel && (
                                    <tr className={groupLabelClass}>
                                        <td colSpan="10">{description}</td>
                                    </tr>
                                )}
                                <tr className={descriptionClass}>
                                    <td>{position}</td>
                                    <td>  <div className="team-cell">
                                        {team.team.logos && team.team.logos.length > 0 && (
                                            <img
                                                src={team.team.logos[0].href}
                                                alt={`${team.team.name} logo`}
                                                className="team-logo"
                                            />
                                        )}
                                        {team.team.name}
                                    </div></td>
                                    <td>{gamesplayed}</td>
                                    <td>{wins}</td>
                                    <td>{ties}</td>
                                    <td>{losses}</td>
                                    <td>{pointsDifferential}</td>
                                    <td>{pointsFor}</td>
                                    <td>{pointsAgainst}</td>
                                    <td>{points}</td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StandingsPage;
