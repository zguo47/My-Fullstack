import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './LeaguePage.css';

const LeaguePage = () => {
  const { leagueId } = useParams();
  const [league, setLeague] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/leagues/${leagueId}`)
      .then((response) => {
        if (response.data.status) {
          setLeague(response.data.data);
        } else {
          console.error('Error fetching league details');
        }
      })
      .catch((error) => console.error(error));
  }, [leagueId]);

  if (!league) return <div>Loading...</div>;

  return (
    <div className="leaguepage">
      <h1 className="leaguepage-title">{league.name}</h1>
      <img src={league.logos.light} alt={`${league.name} logo`} />
      <p>{league.desc}</p>
      <Link to={`/league/${leagueId}/seasons`}>View Seasons</Link>
    </div>
  );
};

export default LeaguePage;
