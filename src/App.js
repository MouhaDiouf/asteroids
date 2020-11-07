import axios from 'axios';
import { useEffect, useState } from 'react';
import Meteor from '../src/Images/meteor.png';
import './App.css';
import ChooseDate from './ChooseDate';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import { connect } from 'react-redux';
import Asteroid from './Asteroid';
import Login from './Login/Login';
import { auth } from './firebase';
import { setUser, logout } from './actions';
import Favorites from './Favorites/Favorites';

function App(props) {
  const [nearEarthObjects, setNearEarthObjects] = useState('');
  useEffect(() => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=dbZCMQWD98s4FbQbtwuEFiwz1Gqxrm2FbdYDuZf4'
      )
      .then(({ data }) => setNearEarthObjects(data.near_earth_objects));
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        console.log('O Auth Was called');
        props.handleSetUser(authUser);
      } else {
        // the user is logged out
        // props.handleLogout();
      }
    });
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
                  <Asteroid asteroid={asteroid} key={asteroid.id} />
                ))}
              </div>
            ) : (
              <p>Fetching near earth objects</p>
            )}
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/choose-date">
            <ChooseDate />
          </Route>
          <Route path="/login">
            <Login />
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

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  // handleLogout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(App);
