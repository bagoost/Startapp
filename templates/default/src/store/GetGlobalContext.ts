/* eslint-disable no-console */
import { Dispatch } from 'react';

// Interfaces
import {
  ActionInterface,
  ContextInterface,
} from '../interfaces';

// Hooks
import { useLocalStorage } from '../hooks';

// InitialState
import { defaultState } from './reducer';

export default function GetGlobalContext(dispatch: Dispatch<ActionInterface>): ContextInterface {
  // Local storage
  const [localState, setLocalState] = useLocalStorage('state', defaultState);

  const globalContext: ContextInterface = {
    example: () => {
      // "Loads" data in one second
      dispatch({ type: 'START_LOADING' });
      setTimeout(() => dispatch({ type: 'FINISH_LOADING' }), 1000);
    },
  };

  return globalContext;
}
