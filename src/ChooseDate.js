import React, { useState } from 'react';

function ChooseDate(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Choose a Date</h1>
      <form>
        <label htmlFor="startDate">Start date:</label> <br />
        <input
          name="start-date"
          id="startDate"
          required
          placeholder="dd-mm-yyyy"
          min="1900-01-01"
          max="2030-12-31"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <label htmlFor="endDate">End date: </label> <br />
        <input
          placeholder="dd-mm-yyyy"
          min="1900-01-01"
          max="2030-12-31"
          name="end-date"
          id="endDate"
          required
          onChange={(e) => setEndDate(e.target.value)}
        />{' '}
        <br />
        <button onClick={handleSubmit}>Check</button>
      </form>
    </div>
  );
}

export default ChooseDate;
