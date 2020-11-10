import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { searchByDate } from '../actions';
import spinner from '../Images/spinner.gif';
import AsteroidsDateResults from '../AsteroidsDateResults/AsteroidsDateResults';
import './ChooseDate.css';

function ChooseDate({ userState, handleSearchByDate }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { searchByDateError, searchingByDate, asteroidsByDate } = userState;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchByDate(startDate, endDate);
  };
  return (
    <div>
      {!searchingByDate && (
        <div className="date-search-div">
          <h1>Choose a Date</h1>
          {searchByDateError && (
            <p className="valid-date">
              Please enter valid dates. The max range in one query is 7 days
            </p>
          )}
          <form className="date-search-form">
            <span>Start date:</span>
            <br />
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
            <span>End date: </span>
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
          {asteroidsByDate && (
            <AsteroidsDateResults asteroids={asteroidsByDate} />
          )}
        </div>
      )}
      {searchingByDate && (
        <div className="loading-div">
          <p>Searching By Date </p>
          <img src={spinner} alt="spinner" />
        </div>
      )}
    </div>
  );
}

ChooseDate.propTypes = {
  userState: PropTypes.shape({
    searchingByDate: PropTypes.bool,
    searchByDateError: PropTypes.bool,
    asteroidsByDate: PropTypes.instanceOf(Object),
  }).isRequired,
  handleSearchByDate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchByDate: (startDate, endDate) =>
    dispatch(searchByDate(startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDate);
