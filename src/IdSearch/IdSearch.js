import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { idSearch } from '../actions';
import spinner from '../Images/spinner.gif';
import './IdSearch.css';

function IdSearch({ userState, dispatchSearchById }) {
  const history = useHistory();
  const [id, setId] = useState('');
  const handleSearchById = () => {
    dispatchSearchById(id);
  };

  const { redirectToIdPage, searchingById, searchByIdError } = userState;
  if (redirectToIdPage) {
    history.push(`/asteroids/${id}/details`);
  }

  return (
    <div>
      <h1>Search By ID</h1>
      <TextField
        id="idSearch"
        label="ID Search"
        type="number"
        variant="outlined"
        color="primary"
        className="outline"
        onChange={(e) => setId(e.target.value)}
        placeholder="ex: 3729835"
        value={id}
      />
      {' '}
      <br />
      {' '}
      <br />
      <Button variant="contained" color="primary" onClick={handleSearchById}>
        Search By ID
      </Button>
      {searchingById && (
        <div className="loading-div">
          <p>Searching By ID </p>
          <img src={spinner} alt="spinner" />
        </div>
      )}
      {searchByIdError && (
        <p className="valid-message-info">Enter a valid ID</p>
      )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSearchById: (id) => dispatch(idSearch(id)),
});
const mapStateToProps = (state) => ({
  userState: state,
});

IdSearch.propTypes = {
  userState: PropTypes.shape({
    redirectToIdPage: PropTypes.bool,
    searchingById: PropTypes.bool,
    searchByIdError: PropTypes.bool,
  }).isRequired,
  dispatchSearchById: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IdSearch);
