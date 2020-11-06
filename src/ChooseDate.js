import React, { useState } from 'react';

function ChooseDate({ startDate, endDate }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  return (
    <div>
      <h1>Choose a Date</h1>
      <form>
        <input
          type="date"
          name="start-date"
          id="startDate"
          required
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          name="end-date"
          id="endDate"
          required
          onChange={(e) => setEndDate(e.target.value)}
        />
      </form>
    </div>
  );
}

export default ChooseDate;
