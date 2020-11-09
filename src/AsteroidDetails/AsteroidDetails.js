import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import AsteroidCard from '../AsteroidCard/AsteroidCard';

function AsteroidDetails() {
  const api_key = process.env.REACT_APP_API_KEY;

  const [asteroidToShow, setAsteroidToShow] = useState('');
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`)
      .then((response) => {
        setAsteroidToShow(response.data);
      });
  });
  const { id } = useParams();
  return (
    <div>
      <h1>Details for {id} </h1>
      {asteroidToShow && <AsteroidCard asteroid={asteroidToShow} />}
    </div>
  );
}

export default AsteroidDetails;
