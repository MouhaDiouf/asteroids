import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push('/');
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="true"
          />
          <button onClick={signIn} className="login__signInButton">
            Sign In
          </button>
        </form>
        <button onClick={register} className="login__registerButton">
          Create Your Asteroid Account
        </button>
      </div>
    </div>
  );
}

export default Login;
