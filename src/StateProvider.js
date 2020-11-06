import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './reducer';

export const StateContext = createContext();

export const StateProvider = ({ reducer, intialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
