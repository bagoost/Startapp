import { createContext } from 'react';
import { ContextInterface, StateInterface } from '../interfaces';
import { defaultState } from './reducer';

const defaultContext: { state: StateInterface, context: ContextInterface | null } = {
  state: defaultState,
  context: null,
};

export default createContext(defaultContext);
