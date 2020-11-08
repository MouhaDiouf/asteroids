import axios from 'axios';
import { useEffect, useState } from 'react';
import Meteor from '../src/Images/meteor.png';
import './App.css';
import ChooseDate from './ChooseDate';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import { connect } from 'react-redux';
import Login from './Login/Login';
import { auth } from './firebase';
import { setUser, logout } from './actions';
import Favorites from './Favorites/Favorites';
import IdSearch from './IdSearch/IdSearch';
import Home from './Home/Home';
import AsteroidsDateResults from './AsteroidsDateResults/AsteroidsDateResults';
import AsteroidDetails from './AsteroidDetails/AsteroidDetails';

function App(props) {
  const api_key = process.env.REACT_APP_API_KEY;
  const [nearEarthObjects, setNearEarthObjects] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${api_key}`
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
      {/* <div className="wrapper"> */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {/* <div id="title">
        <span>Pure CSS</span>
        <br />
        <span>Parallax ePIXEL</span>
      </div> */}
      {/* </div> */}
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home nearEarthObjects={nearEarthObjects} />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/search-by-date">
            <ChooseDate />
          </Route>
          <Route path="/search-by-id">
            <IdSearch />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/asteroids/:id/details">
            <AsteroidDetails />
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
