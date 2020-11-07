import React, { useState } from 'react';
import { connect } from 'react-redux';
import { idSearch } from '../actions';

import './IdSearch.css';

function IdSearch(props) {
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
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSearchById: (id) => dispatch(idSearch(id)),
});
export default connect(null, mapDispatchToProps)(IdSearch);
