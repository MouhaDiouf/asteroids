import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e) => {
    e.preventDefault();
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
            onChange={(e) => setPassword(e.target.password)}
            required
          />
          <button onClick={signIn} className="login__signInButton">
            Sign In
          </button>
        </form>
        <button className="login__registerButton">
          Create Your Asteroid Account
        </button>
      </div>
    </div>
  );
}

export default Login;
