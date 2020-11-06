import axios from 'axios';
import { useEffect, useState } from 'react';
import Meteor from '../src/Images/meteor.png';
import './App.css';
import ChooseDate from './ChooseDate';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useStateValue } from './StateProvider';
function App() {
  const [nearEarthObjects, setNearEarthObjects] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=dbZCMQWD98s4FbQbtwuEFiwz1Gqxrm2FbdYDuZf4'
      )
      .then(({ data }) => setNearEarthObjects(data.near_earth_objects));
  }, []);
  const [state, dispatch] = useStateValue();
  const addToFavorites = () => {
    //dispatch the item into the favorites
    dispatch({
      type: 'ADD_TO_FAVORITES',
      item: {
        name: 'item',
      },
    });
  };
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <h1>Welcome to Asteroids</h1>

            {nearEarthObjects?.length ? (
              <div className="app__browse_asteroids">
                {nearEarthObjects.map((asteroid) => (
                  <div className="app__asteroid_div">
                    <img src={Meteor} alt="Meteor" />
                    <button onClick={addToFavorites}>Add To Favorites</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Fetching near earth objects</p>
            )}
          </Route>
          <Route path="/choose-date">
            <ChooseDate />
          </Route>
          <Route path="/">
            <h1>Not found</h1>
            <Switch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
