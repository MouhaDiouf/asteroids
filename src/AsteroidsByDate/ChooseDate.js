import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { searchByDate } from '../actions';
import spinner from '../Images/spinner.gif';
import AsteroidsDateResults from '../AsteroidsDateResults/AsteroidsDateResults';
import './ChooseDate.css';

function ChooseDate(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSearchByDate(startDate, endDate);
  };

  return (
    <div>
      {!props.userState.searchingByDate && (
        <>
          <h1>Choose a Date</h1>
          <form className="date-search-form">
            <label htmlFor="startDate">Start date:</label>
            {' '}
            <br />
            {/* <input
              name="start-date"
              id="startDate"
              required
              placeholder="yyyy-mm-dd"
              min="1900-01-01"
              max="2030-12-31"
              onChange={(e) => setStartDate(e.target.value)}
            /> */}
            <TextField
              label="Starting Date"
              name="start-date"
              id="startDate"
              required
              placeholder="yyyy-mm-dd"
              min="1900-01-01"
              max="2030-12-31"
              className="inputDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label htmlFor="endDate">End date: </label>
            {' '}
            <br />
            <TextField
              label="Ending Date"
              placeholder="yyyy-mm-dd"
              min="1900-01-01"
              max="2030-12-31"
              name="end-date"
              id="endDate"
              className="inputDate"
              required
              onChange={(e) => setEndDate(e.target.value)}
            />
            {/* <input
              placeholder="yyyy-mm-dd"
              min="1900-01-01"
              max="2030-12-31"
              name="end-date"
              id="endDate"
              required
              onChange={(e) => setEndDate(e.target.value)}
            />{' '} */}
            <br />
            <Button
              variant="contained"
              color="primary"
              className="date-search-form__button"
              onClick={handleSubmit}
            >
              Check Asteroids
            </Button>
          </form>
          {props.userState.asteroidsByDate && (
            <AsteroidsDateResults asteroids={props.userState.asteroidsByDate} />
          )}
        </>
      )}
      {props.userState.searchingByDate && (
        <div className="loading-div">
          <p>Searching By Date </p>
          <img src={spinner} alt="spinner" />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchByDate: (startDate, endDate) => dispatch(searchByDate(startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDate);
