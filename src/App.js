import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ChooseDate from './AsteroidsByDate/ChooseDate';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login/Login';
import { auth } from './firebase';
import { setUser } from './actions';
import Favorites from './Favorites/Favorites';
import IdSearch from './IdSearch/IdSearch';
import Home from './Home/Home';
import AsteroidDetails from './AsteroidDetails/AsteroidDetails';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import About from './About/About';

function App(props) {
  const api_key = process.env.REACT_APP_API_KEY;
  const [nearEarthObjects, setNearEarthObjects] = useState('');
  const { user } = props.userState;
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${api_key}`
      )
      .then(({ data }) => setNearEarthObjects(data.near_earth_objects));
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.handleSetUser(authUser);
      } else {
        // props.handleLogout();
      }
    });
  }, []);

  return (
    <div className="app">
      <div className="wrapper">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home nearEarthObjects={nearEarthObjects} />
          </Route>

          <Route path="/favorites">
            {' '}
            {user ? (
              <Favorites />
            ) : (
              <p>
                <Link to="/login">Login</Link> to see your favorites
              </p>
            )}
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <h1>Not found</h1>
            <Switch />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});
const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  // handleLogout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
