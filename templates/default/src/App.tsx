import {
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Store
import {
  defaultState,
  GetGlobalContext,
  GlobalContext,
  reducer,
} from './store';

// Interfaces
import {
  ContextInterface,
  StateInterface,
} from './interfaces';

// Hooks
import { useLocalStorage } from './hooks';

// Components
import {
  Loader,
  Routes,
} from './components';

function App() {
  // Context
  const [state, dispatch] = useReducer(reducer, defaultState);
  const globalContext = GetGlobalContext(dispatch);
  const { example } = globalContext;

  // Local storage
  const [localState] = useLocalStorage('state', defaultState);

  // Provider value
  const providerValue = useMemo<{ state: StateInterface, context: ContextInterface }>(() => (
    { state, context: globalContext }
  ), []);

  // Example function called when rendering
  useEffect(() => {
    example();
  }, []);

  return (
    <GlobalContext.Provider value={providerValue}>
      <Router>
        <Routes />
      </Router>
      {(state.loading > 0) && (
        <Loader />
      )}
    </GlobalContext.Provider>
  );
}

export default App;
