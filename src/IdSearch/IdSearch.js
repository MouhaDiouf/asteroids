import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { idSearch } from '../actions';
import spinner from '../Images/spinner.gif';
import Alert from '@material-ui/lab/Alert';

import './IdSearch.css';
import { useHistory } from 'react-router';

function IdSearch(props) {
  const history = useHistory();
  const [id, setId] = useState('');
  const handleSearchById = () => {
    props.dispatchSearchById(id);
  };

  const { userState } = props;

  if (userState.redirectToIdPage) {
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
      />{' '}
      <br /> <br />
      <Button variant="contained" color="primary" onClick={handleSearchById}>
        Search By ID
      </Button>
      {props.userState.searchingById && (
        <div className="loading-div">
          <p>Searching By ID </p>
          <img src={spinner} alt="spinner" />
        </div>
      )}
      {props.userState.searchByIdError && (
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
export default connect(mapStateToProps, mapDispatchToProps)(IdSearch);
