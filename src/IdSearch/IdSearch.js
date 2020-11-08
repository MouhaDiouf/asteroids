import React, { useState } from 'react';
import { connect } from 'react-redux';
import { idSearch } from '../actions';
import spinner from '../Images/spinner.gif';

import './IdSearch.css';

function IdSearch(props) {
  console.log('props for user is ', props);
  const [id, setId] = useState('');
  const handleSearchById = () => {
    props.dispatchSearchById(id);
    console.log('ID SEARCH CALLED WITH ID ', id);
  };
  return (
    <div>
      <h1>Search By ID</h1>
      <input
        type="number"
        name="idSearch"
        id="idSearch"
        placeholder="ex: 3729835"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />{' '}
      <br /> <br />
      <button onClick={handleSearchById}>Search By ID</button>
      {props.userState.searchingById && (
        <div className="loading-div">
          <p>Searching By ID </p>
          <img src={spinner} alt="spinner" />
        </div>
      )}
      {props.userState.searchByIdError && <p>Enter a valid ID</p>}
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
