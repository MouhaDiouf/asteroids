import axios from 'axios';
import { useEffect, useState } from 'react';
import Meteor from '../src/Images/meteor.png';
import './App.css';
import ChooseDate from './ChooseDate';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
function App() {
  const [nearEarthObjects, setNearEarthObjects] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=dbZCMQWD98s4FbQbtwuEFiwz1Gqxrm2FbdYDuZf4'
      )
      .then(({ data }) => setNearEarthObjects(data.near_earth_objects));
  }, []);
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
                    Icons made by{' '}
                    <a
                      href="https://www.flaticon.com/authors/smashicons"
                      title="Smashicons"
                    >
                      Smashicons
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                      www.flaticon.com
                    </a>
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
